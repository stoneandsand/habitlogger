import React from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import axios from "axios";
import $ from "jquery";
import OccurenceScatterPlot from "./OccurenceScatterPlot.jsx";
import AllPieChart from "./AllPieChart.jsx";
import BarGraph from "./BarGraph.jsx";

class Chart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allHabits: true,
			Scatterplot: false,
			bargraph: false,
			width: 500,
			height: 400,
			habits: [],
		};

		this.showAllHabits = this.showAllHabits.bind(this);
		this.showIndividualHabit = this.showIndividualHabit.bind(this);
	}

	componentWillMount(){
		var self = this;

		axios
		  .get('/graphData')
		  .then(res => {
		  	if (res.data) {
				self.setState({
					habits: res.data
				});
			}
		  })
		  .catch(err => {
		    console.log('error code here', err);
		  });
	}

	showAllHabits() {
		this.setState({
			allHabits: true,
			Scatterplot: false,
			bargraph: false
		});
	}

	showIndividualHabit() {
		this.setState({
			allHabits: false,
			Scatterplot: true,
			bargraph: false
		});
	}
	showBarGraph() {
		this.setState({
			allHabits: false,
			Scatterplot: false,
			bargraph: true
		});
	}

	render() {
		return (
			<div className="chart-container">
				<button className="effect--1 graph-button" onClick={this.showAllHabits}>
					All Habits
				</button>
				<button
					className="effect--2 graph-button"
					onClick={this.showBarGraph.bind(this)}
				>
					Bar Graph
				</button>
				<button
					className="effect--3 graph-button"
					onClick={this.showIndividualHabit}
				>
					Scatterplot
				</button>
				{this.state.Scatterplot ? (
					<OccurenceScatterPlot
						data={this.state.data}
						habitData={this.state.habitData}
						habits={this.state.habits}
						width={this.state.width}
						height={this.state.height}
					/>
				) : null}
				{this.state.bargraph ? (
					<BarGraph
						data={this.state.data}
						habitData={this.state.habitData}
						habits={this.state.habits}
						width={this.state.width}
						height={this.state.height}
					/>
				) : null}
				{this.state.allHabits ? (
					<AllPieChart
						data={this.state.data}
						habitData={this.state.habitData}
						habits={this.state.habits}
						width={this.state.width}
						height={this.state.height}
					/>
				) : null}
				
			</div>
		);
	}
}

export default Chart;