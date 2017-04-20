import React from 'react';
import * as d3 from 'd3';


export default class LineChart extends React.Component{
    constructor(props){
        super(props);
        this.colors = ['#0000FF', '#00FF00'];
    }

    componentWillMount () {
        
    }

    render () {
        return (

            <svg data-region="line-chart" width="400" height="250" ref={el=> this.container = el}/>
        );
    }

    componentWillReceiveProps(newProps){
        console.log('receivingprops', newProps)
    }

    componentDidMount() {
        const svg = d3.select(this.container),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            chartContainer = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const {xScale, yScale, zScale} = getScales({width, height});
        const {xAxis, yAxis} = addAxes({chartContainer, xScale, yScale, height});
        const {xDomain, yDomain} = getXYDomain({data: this.props.data});

        const data = this.props.data.map((_data, index)=> {
            return {
                id: `mortgage-${index}`,
                values: _data
            };
        });

        xScale.domain(xDomain);
        yScale.domain(yDomain);
        zScale.domain(data.map(function(_data) { return _data.id; }));


        createLineChart({
            chartContainer,
            width,
            height,
            lineColor: this.colors,
            data,
            xScale,
            yScale,
            zScale,
            xAxis,
            yAxis,
            xScaleFn,
            yScaleFn
        });

        addYAxisLabel({chartContainer, yAxis, label: 'Remaining Balance'});
        function xScaleFn(d){
            return d.date;
        }
        function yScaleFn(d){
            return d.balance;
        }
    }
}

function getXYDomain({data}){

    const xyDomain = data.reduce((_xyDomain, schedule)=> {
        const first = schedule[schedule.length - 1],
            last = schedule[0];

        _xyDomain.balance = [].concat(_xyDomain.balance, [first.balance, last.balance]);
        _xyDomain.date = {
            ..._xyDomain.date,
            [first.dateKey]: {date: first.date, dateKey: first.dateKey},
            [last.dateKey]: {date: last.date, dateKey: last.dateKey}
        };

        return _xyDomain;
    }, {balance: [], date: []});

    const yDomain = xyDomain.balance.filter((balance, index, arr)=>{
        return arr.indexOf(balance, index + 1) === -1;
    }).sort();

    const xDomain = Object.keys(xyDomain.date).sort().map(dateKey=> xyDomain.date[dateKey].date);

    return {yDomain, xDomain};
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

function createLineChart({chartContainer, data, lineColor, xScale, yScale, zScale, xScaleFn, yScaleFn, width, height}){

    const line = getLine({xScale, yScale, xScaleFn, yScaleFn});

    const schedule = chartContainer.selectAll(".schedule")
        .data(data)
        .enter().append("g")
        .attr("class", "schedule");

    schedule.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", ()=> lineColor.shift() || '#000000')
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)

        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return zScale(d.id); });

    schedule.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + xScale(d.value.date) + "," + yScale(d.value.balance) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(function(d) { return d.id; });
}