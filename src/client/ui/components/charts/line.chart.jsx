import React from 'react';
import * as d3 from 'd3';


export default class LineChart extends React.Component{
    constructor(props){
        super(props);
        this.colors = ['#0000FF', '#00FF00'];
    }

    render () {
        return (

            <svg data-region="line-chart" width="400" height="250" ref={el=> this.container = el}/>
        );
    }

    componentDidMount() {
        const svg = d3.select(this.container),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            chartContainer = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const {xScale, yScale} = getScales({width, height});
        const {xAxis, yAxis} = addAxes({chartContainer, xScale, yScale, height});

        const xDomain = d3.extent(this.props.data[0], xScaleFn);
        const yDomain = d3.extent(this.props.data[0], yScaleFn);

        xScale.domain(xDomain);
        yScale.domain(yDomain);

        this.props.data.forEach((_data, index)=>{
            createLineChart({
                chartContainer,
                width,
                height,
                lineColor: this.colors[index],
                data: _data,
                xScale,
                yScale,
                xAxis,
                yAxis,
                xScaleFn,
                yScaleFn
            });

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
        .x(function lineXScale(d) { return xScale(xScaleFn(d)); })
        .y(function lineYScale(d) { return yScale(yScaleFn(d)); });
}

function getScales({width, height}){

    var xScale = d3.scaleTime()
        .rangeRound([0, width]);

    var yScale = d3.scaleLinear()
        .rangeRound([height, 0]);

    return {xScale, yScale};
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

function createLineChart({chartContainer, data, lineColor, xScale, yScale, xScaleFn, yScaleFn, width, height}){

    var line = getLine({xScale, yScale, xScaleFn, yScaleFn});

    chartContainer.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}