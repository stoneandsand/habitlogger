import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";

class BarGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const div = new ReactFauxDOM.Element("div");
        let data = this.props.habits[2];
        console.log("DATA >>>>>>>>>", data);

        // Container Sizing
        let padding = 25;
        let margin = { top: 40, right: 40, bottom: 40, left: 40 },
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Mapping single instance data to an array of values and dates

        // An Array of occurence values in a single habit
        var valueRange = this.props.habits[2].occurrences.reduce((acc, cur) => {
            acc.push(cur.value);
            return acc;
        }, []);

        // An array of dates in the instance
        var dateRange = this.props.habits[2].occurrences.reduce((acc, cur) => {
            acc.push(cur.timestamp);
            return acc;
        }, []);

        // An array of dates converted into D3 format
        var mappedDates = dateRange.map((e, i) => {
            return d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(e);
            // return strictIsoParse(e);
        });

        var mappedDeadline = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(
            data.deadline
        );

        let x = d3
            .scaleTime() //scaleBand
            .domain([Math.min.apply(null, mappedDates), mappedDeadline])
            .range([0, width]);

        let y = d3
            .scaleLinear()
            .domain([data.goal + Math.max.apply(null, valueRange), 0])
            .range([0, height]);

        let xAxis = d3
            .axisBottom()
            .scale(x)
            .ticks(7);

        let yAxis = d3.axisLeft().scale(y);

        //Pass it to d3.select and proceed as normal
        let svg = d3
            .select(div)
            .append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height)
            .style("background-color", "#333A56")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        svg
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 4)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

        function validLine(index, item) {
            if (data.occurrences[index + 1]) {
                return data.occurrences[index + 1].value;
            } else {
                return null;
            }
        }

        data.occurrences.forEach((item, index, array) => {
            console.log(y(item.value));
            svg
                .append("rect")
                .attr("class", "scatter-bar")
                .attr("x", x(mappedDates[index]))
                .attr("y", y(item.value))
                .attr("width", 15)
                .attr("height", height - y(item.value))

                .style("fill", "#F7F5E6")
                .on("mouseover", function() {
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 0.9);
                    tooltip
                        .html(item.notes)
                        .style("left", d3.event.pageX + 10 + "px")
                        .style("top", d3.event.pageY - 5 + "px");
                })
                .on("mouseleave", function() {
                    tooltip
                        .transition()
                        .duration(100)
                        .style("opacity", 0);
                });
        });

        var goalLegend = d3
            .select("body")
            .append("div")
            .attr("class", "goalLegend")
            .style("opacity", 100);

        // GOAL LINE
        svg
            .append("line")
            .attr("x1", 0)
            .attr("x2", x(mappedDeadline))
            .attr("y1", y([data.goal]))
            .attr("y2", y([data.goal]))
            .attr("stroke", "red")
            .attr("stroke-width", "3");

        svg
            .append("text")
            .attr("class", "goalLegend")
            .style("fill", "red")
            .attr("text-anchor", "middle")
            .attr("x", x(mappedDeadline) / 2)
            .attr("y", y([data.goal]) - 3)
            .text("GOAL");

        svg
            .append("circle")
            .attr("class", "deadline-point")
            .attr("cx", x(mappedDeadline))
            .attr("cy", y([data.goal]))
            .attr("r", 10)
            .style("fill", "#00bcd1")
            .style("stroke", "white");
        svg
            .append("text")
            .attr("class", "goalLegend")
            .style("fill", "E8E8E8")
            .attr("text-anchor", "middle")
            .attr("x", x(mappedDeadline))
            .attr("y", y([data.goal]) - 15)
            .text("Deadline")
            .style("font-size", "0.65em");

        return <div>{div.toReact()}</div>;
    }
}

export default BarGraph;

// x.domain(data.map((d) => d.letter));
// y.domain([0, d3.max(data, (d) => d.frequency)]);
