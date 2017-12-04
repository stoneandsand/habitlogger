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
		let padding = 25;
		let margin = { top: 40, right: 40, bottom: 40, left: 40 },
			width = 500 + margin.left + margin.right,
			height = 350 + margin.top + margin.bottom,
			radius = Math.min(500, 350) / 2;

		var svg = d3.select(div) 
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background-color', '#333A56')
			var g = svg.append("g").attr("transform", "translate(" + (290) + "," + (radius + 40)  + ")");

		var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.occurrences.length });

		var path = d3.arc()
			.outerRadius(radius)
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
		      .attr("dy", "0.35em")
		      .text(function(d) { return "Habit: " + d.data.habit; });

		arc.append("text")
		      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		      .attr("dy", "1em")
		      .style('z-index', '9999')
		      .text(function(d) { return "Logs: " + d.data.occurrences.length; });

		return <div>{div.toReact()}</div>;
	}
}

export default AllPieChart;


// habit, occurences