import React from 'react';
import * as d3 from 'd3';


export default class LineChart extends React.Component{
    static defaultProps = {
        containerWidth: '400',
        containerHeight: '250',
        margin: {top: 20, right: 20, bottom: 30, left: 50},
        colors: ['#0000FF', '#00FF00']
    };

    constructor(props){
        super(props);

        this.chartCount = 0;
        this.state = this.getInitialState(props);
    }

    componentWillMount () {

    }

    render () {
        return (

            <svg data-region="line-chart" width={this.props.containerWidth} height={this.props.containerHeight} ref={el=> this.container = el}/>
        );
    }

    getInitialState(props){
        const {containerWidth, containerHeight, margin} = props,
            width = containerWidth - margin.left - margin.right,
            height = containerHeight - margin.top - margin.bottom;

        return {
            width,
            height
        };
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentDidMount() {
        const svg = d3.select(this.container),
            {margin} = this.props;

        this.chartContainer = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
        this.updateChart();

    }

    componentWillUnmount() {
        this.state.chartContainer.remove();
    }

    updateChart() {
        const {width, height} = this.state;
        const {chartContainer} = this;

        const {xScale, yScale, zScale} = getScales({width, height});
        const {xAxis, yAxis} = addAxes({chartContainer, xScale, yScale, height});
        const {xDomain, yDomain} = getXYDomain({data: this.props.data});

        const data = this.props.data.map((_data, index)=> {
            return {
                id: `mortgage-${++this.chartCount}`,
                values: _data
            };
        });

        xScale.domain(xDomain);
        yScale.domain(yDomain);
        zScale.domain(data.map(function(_data) { return _data.id; }));

        addYAxisLabel({chartContainer, yAxis, label: 'Remaining Balance'});

        this.prevLine = createLineChart({
            chartContainer,
            width,
            height,
            lineColor: this.props.colors.slice(),
            data,
            xScale,
            yScale,
            zScale,
            xAxis,
            yAxis,
            xScaleFn,
            yScaleFn,
            prevLine: this.prevLine
        });
        function xScaleFn(d){
            return d.date;
        }
        function yScaleFn(d){
            return d.balance;
        }

        return chartContainer;
    }
}

function getXYDomain({data}){

    const xyDomain = data.reduce((_xyDomain, schedule)=> {
        const first = schedule[schedule.length - 1],
            last = schedule[0] || {};

        if (typeof first === 'undefined' || typeof last === undefined){
            return _xyDomain;
        }

        _xyDomain.balance = [].concat(_xyDomain.balance, [first.balance, last.balance]);
        _xyDomain.date = {
            ..._xyDomain.date,
            [`${first.date.getFullYear()}-${first.date.getMonth()}`]: {date: first.date, dateKey: first.dateKey},
            [`${last.date.getFullYear()}-${last.date.getMonth()}`]: {date: last.date, dateKey: last.dateKey}
        };

        return _xyDomain;
    }, {balance: [], date: []});

    const yDomain = xyDomain.balance.filter((balance, index, arr)=>{
        return arr.indexOf(balance, index + 1) === -1;
    }).sort();

    const xDomain = Object.keys(xyDomain.date).sort().map(dateKey=> xyDomain.date[dateKey].date);

    return {yDomain: [yDomain[0], yDomain.pop()], xDomain: [xDomain[0], xDomain.pop()]};
}

function addYAxisLabel({yAxis, label}){
    yAxis
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(label);
}

function getLine({xScale, yScale, xScaleFn, yScaleFn}){
    return d3.line()
        .curve(d3.curveBasis)
        .x(function lineXScale(d) { return xScale(xScaleFn(d)); })
        .y(function lineYScale(d) { return yScale(yScaleFn(d)); });
}

function getScales({width, height}) {

    const xScale = d3.scaleTime()
            .rangeRound([0, width]),
        yScale = d3.scaleLinear()
            .rangeRound([height, 0]),
        zScale = d3.scaleOrdinal(d3.schemeCategory10);

    return {xScale, yScale, zScale};
}

function addAxes({chartContainer, xScale, yScale, height}){
    chartContainer.selectAll('.line-chart__x-axis').remove();
    chartContainer.selectAll('.line-chart__y-axis').remove();

    const xAxis = chartContainer.append("g");
    xAxis
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .attr('class', 'line-chart__x-axis');

    const yAxis = chartContainer.append("g")
        .call(d3.axisLeft(yScale))
        .attr('class', 'line-chart__y-axis');

    return {
        yAxis,
        xAxis
    };
}

function createLineChart({chartContainer, data, lineColor, xScale, yScale, zScale, xScaleFn, yScaleFn, width}){

    const line = getLine({xScale, yScale, xScaleFn, yScaleFn});

    const schedule = chartContainer.selectAll(".schedule")
        .data(data, d=> {
            return d.id
        });

    schedule.exit().remove();
    const cont = schedule.enter()
        .append("g")
        .attr("class", "schedule");

    const lineChart = cont
        .selectAll("path")
        .data(d=> [d], d=> {
            return d.id
        });

    lineChart
        .enter()
        .append('path')
            .merge(lineChart)
        .attr("d", function(d) {
            return line(d.values);
        })
            .attr("class", `line`)
            .attr("fill", "none")
            .attr("stroke", ()=> lineColor.shift() || '#000000')
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .style("stroke", function(d) { return zScale(d.id); });

    return line;
}