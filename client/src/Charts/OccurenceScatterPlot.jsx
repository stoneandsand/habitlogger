import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";

class OccurenceScatterPlot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		}
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
    console.log('mappedDates', mappedDates);

		let x = d3
    	.scaleTime() //scaleBand
    	.domain([
    		Math.min.apply(null, mappedDates),
    		Math.max.apply(null, mappedDates)
    	])
    	.range([0, width]);

    console.log('mapping date data', x(mappedDates[2]))
    let y = d3
    	.scaleLinear()
    	.domain([
    		Math.max.apply(null, valueRange),
    		0
    	])
    	.range([0, height]);

    let xAxis = d3
    	.axisBottom()
    	.scale(x)
    	.ticks(10);

    let yAxis = d3.axisLeft()
    	.scale(y);

    //Pass it to d3.select and proceed as normal
    let svg = d3
    	.select(div)
    	.append("svg")
    	.attr("width", this.props.width)
    	.attr("height", this.props.height)
    	.style("background-color", "#00695C")
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

    var rect2 = svg
    	.append("rect")
    	.attr("width", 150)
    	.attr("height", 100)
    	.attr("x", 40)
    	.attr("y", 100)
    	.style("fill", "white")
    	.attr("stroke", "black");


 		function validLine(index, item) {
    	if (data.occurrences[index + 1]) {
    		return data.occurrences[index + 1].value }
    	else { return null }
    }    	


    data.occurrences.forEach((item, index, array) => {
    	svg.append('circle')
    		.attr('cx', x(mappedDates[index]))
    		.attr('cy', y([item.value]))
    		.attr('r', item.value / 2)
    		.style('fill', 'red')
    	if (validLine(index, item)) {
    	svg.append('line')
    		.style('stroke', 'brown')
    		.attr('x1', x(mappedDates[index]))
    		.attr('x2', x(mappedDates[index + 1]))
    		.attr('y1', y([item.value]))
    		.attr('y2', y(validLine(index, item)))
			}   
    });

    svg.append('line')
    	.attr('x1', 0)
    	.attr('x2', width)
    	.attr('y1', y([data.goal]))
    	.attr('y2', y([data.goal]))
    	.attr('stroke', 'black')
    	.attr('stroke-width', "5")

    var text = svg
    	.append("text")
    	.text("This is some information about whatever")
    	.attr("x", 50)
    	.attr("y", 150)
    	.attr("fill", "black");

    var rectColor = d3.selectAll("rect").style("color", function() {
    	console.log("selected all rects", this);
    	return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });

    return (
    	<div>
    		{div.toReact()}
    	</div>
    );
  }
}

export default OccurenceScatterPlot;

// x.domain(data.map((d) => d.letter));
// y.domain([0, d3.max(data, (d) => d.frequency)]);