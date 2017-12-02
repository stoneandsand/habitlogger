import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";
import OccurenceScatterPlot from './OccurenceScatterPlot.jsx';
import AllPieChart from './AllPieChart.jsx';

class Chart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allHabits: true,
			selectedHabit: false,
			width: 500,
			height: 350,
			data: [
				{
					timestamp: "2017-10-22T14:34:15.075Z",
					value: 125,
					notes: "had a great day, sunny outside."
				},
				{
					timestamp: "2017-11-23T14:34:15.075Z",
					value: 3,
					notes: "Car accident."
				},
				{
					timestamp: "2017-12-22T14:34:15.075Z",
					value: 4,
					notes: "had a great day, sunny outside."
				},
				{
					timestamp: "2017-4-22T14:34:15.075Z",
					value: 4,
					notes: "had a great day, sunny outside."
				},
				{
					timestamp: "2017-6-22T14:34:15.075Z",
					value: 4,
					notes: "had a great day, sunny outside."
				},
				{
					timestamp: "2016-01-22T14:34:15.075Z",
					value: 4,
					notes: "had a great day, sunny outside."
				},
				{
					timestamp: "2015-6-22T14:34:15.075Z",
					value: 4,
					notes: "had a great day, sunny outside."
				}
			],
			habitData: [
				{
					habit: "smoking",
					goal: 5,
					unit: "packs",
					timeframe: "day",
					deadline: "2017-12-31T14:38:15.074Z"
				},
				{
					habit: "Video Games",
					goal: 25,
					unit: "hours",
					timeframe: "week",
					deadline: "2017-12-31T14:38:15.074Z"
				},
				{
					habit: "zen",
					goal: 3,
					unit: "enlightenment",
					timeframe: "week",
					deadline: "2017-12-31T14:38:15.074Z"
				}
			],

			habits: [
				{
					habit: "rolling",
					goal: 5,
					unit: "rolls",
					timeframe: "day",
					deadline: "2017-12-31T14:38:15.074Z",
					occurrences: [
						{
							timestamp: "2017-11-22T14:34:15.075Z",
							value: "1",
							notes: "had a great day, sunny outside."
						}
					]
				},
				{
					habit: "smoking",
					goal: 25,
					unit: "packs",
					timeframe: "day",
					deadline: "2017-12-31T14:38:15.074Z",
					occurrences: [
						{
							timestamp: "2017-10-22T14:34:15.075Z",
							value: "1",
							notes: "had a great day, sunny outside."
						},
						{
							timestamp: "2017-11-23T14:34:15.075Z",
							value: "3",
							notes: "Car accident."
						},
						{
							timestamp: "2017-12-22T14:34:15.075Z",
							value: "4",
							notes: "had a great day, sunny outside."
						}
					]
				},
				{
					habit: "Video Games",
					goal: 25,
					unit: "hours",
					timeframe: "week",
					deadline: "2017-10-31T14:38:15.074Z",
					occurrences: [
						{
							timestamp: "2017-08-22T11:34:15.075Z",
							value: "6",
							notes: "Car accident."
						},
						{
							timestamp: "2017-09-24T14:37:15.075Z",
							value: "7",
							notes: "had a great day, sunny outside."
						},
						{
							timestamp: "2017-10-27T17:42:15.075Z",
							value: "9",
							notes: "Polar bear crossed road."
						},
						{
							timestamp: "2017-10-30T14:34:15.075Z",
							value: "12",
							notes: "warm night"
						},
						{
							timestamp: "2017-11-02T13:34:15.075Z",
							value: "4",
							notes: "had a great day, sunny outside."
						},
						{
							timestamp: "2017-11-06T13:34:15.075Z",
							value: "67",
							notes: "had a great day, sunny outside."
						}
					]
				}
			]
		};

		this.showAllHabits = this.showAllHabits.bind(this);
		this.showIndividualHabit = this.showIndividualHabit.bind(this);
	}

	showAllHabits() {
		this.setState({
			allHabits: true
		})
	}
	showIndividualHabit() {
		this.setState({
			allHabits: false
		})
	}


	render() {
		return (<div>
			<button className="effect--1" onClick={this.showAllHabits}>All Habits</button>
			<button className="effect--2" onClick={this.showIndividualHabit}>Individual Habit</button>

			{ this.state.allHabits ? 
			<OccurenceScatterPlot data={this.state.data} habitData={this.state.habitData} habits={this.state.habits} width={this.state.width} height={this.state.height}/> :
			<AllPieChart data={this.state.data} habitData={this.state.habitData} habits={this.state.habits} width={this.state.width} height={this.state.height} />
			}
		</div>)
	}
}

export default Chart;

//   svg.selectAll(".bar")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", (d) => x(d.letter))
//     .attr("width", 20)
//     .attr("y", (d) => y(d.frequency))
//     .attr("height", (d) => {return height - y(d.frequency)});

//   //DOM manipulations done, convert to React
