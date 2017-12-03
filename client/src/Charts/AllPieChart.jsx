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
	    let data = this.props.habits;
	    console.log("All Habit DATA >>>>>>>>>", data);

	    // Container Sizing
	    let padding = 25;
	    let margin = { top: 40, right: 40, bottom: 40, left: 40 },
	    	width = this.props.width - margin.left - margin.right,
	    	height = this.props.height - margin.top - margin.bottom;

	    return (
	    	<div>
	    		{div.toReact()}
	    	</div>
	    );
	  }
}

export default AllPieChart;