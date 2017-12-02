import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";


class AllPieChart extends React.Component {

		constructor(props) {
			super(props);

			this.state = {

			}
		}



	  render() {
	    const div = new ReactFauxDOM.Element("div");
	    let data = this.props.data;
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
	    var dateRange = this.props.data.reduce((acc, cur) => {
	    	acc.push(cur.timestamp);
	    	return acc;
	    }, []);

	    // An array of dates converted into D3 format
	    var mappedDates = dateRange.map((e, i) => {
	    	return d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(e);
	    	// return strictIsoParse(e);
	    });

			
			let x = d3
	    	.scaleTime() //scaleBand
	    	.domain([
	    		Math.min.apply(null, mappedDates),
	    		Math.max.apply(null, mappedDates)
	    	])
	    	.range([0, width]);

	    let y = d3
	    	.scaleLinear()
	    	.domain([
	    		Math.max.apply(null, valueRange),
	    		Math.min.apply(null, valueRange)
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

	    var circle = svg
	    	.append("circle")
	    	.attr("cx", 30)
	    	.attr("cy", 300)
	    	.attr("r", 50)
	    	.style("stroke", "#22BB66")
	    	.style("fill", "transparent");

	    var rect2 = svg
	    	.append("rect")
	    	.attr("width", 150)
	    	.attr("height", 100)
	    	.attr("x", 40)
	    	.attr("y", 100)
	    	.style("fill", "white")
	    	.attr("stroke", "black");

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

export default AllPieChart;