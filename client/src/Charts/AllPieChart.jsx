import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";
import _ from "underscore";

class AllPieChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const div = new ReactFauxDOM.Element("div");
		let data = this.props.habits;
		console.log("All Habit DATA >>>>>>>>>", data);
		console.log("props type", typeof this.props.index);
		console.log()
		// FORMER MAPPING TO SEPERATE OBJECT (MAY NOT BE NEEDED)
		// let habits = data.reduce((acc, cur) => {
		// 	acc[cur.habit] = habit;
		// 	acc[]
		// 	cur.occurrences.forEach((item) => {
		// 		acc[cur.habit] += 1;
		// 	})
		// 	return acc;
		// }, {});
		// var habitsList = Object.keys(habits);
		// var occurencesTotal = _.values(habits);

		console.log(data);


		// Container Sizing

		let margin = { top: 40, right: 40, bottom: 40, left: 40 },
			width = 500,
			height = 400,
			radius = Math.min(500, 400) / 2;

		var svg = d3.select(div) 
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background-color', '#52658F')
			var g = svg.append("g").attr("transform", "translate(" + (250) + "," + (200)  + ")");

		var color = d3.scaleOrdinal(["#EC407A", "#333A56", "#00bcd1", "#E8E8E8", "#a05d56", "#d0743c", "#ff8c00"]);

		var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.occurrences.length });

		var path = d3.arc()
			.outerRadius(radius - 25)
			.innerRadius(35)

		var label = d3.arc()
		    .outerRadius(radius - 40)
		    .innerRadius(radius - 40);

		var arc = g.selectAll(".arc")
		  .data(pie(data))
		  .enter().append("g")
		    .attr("class", "arc");

		arc.append("path")
		    .attr("d", path)
		    .attr("fill", function(d, i) { return color(i)} );

		arc.append("text")
		      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		      .style('font-size', '0.5em')
		      .attr("dy", "0.35em")
		      .style('stroke', '#F7F5E6')
		      .text(function(d) { return "Habit: " + d.data.habit; });

		arc.append("text")
		      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		      .attr("dy", "1em")
		      .style('z-index', '9999')
		      .style('font-size', '0.5em')
		      .style('fill', '#F7F5E6')
		      .text(function(d) { return "Logs: " + d.data.occurrences.length; });

		return <div>{div.toReact()}</div>;
	}
}

export default AllPieChart;


// habit, occurences