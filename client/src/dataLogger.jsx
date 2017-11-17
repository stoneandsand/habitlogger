import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DataLogger extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var dataLog = document.forms.logInput;
		this.props.logItem(dataLog, 'placeholder');
	}


	render() {
		
		return(
			<div>			
				<form name="logInput">
  				<input type="number" name="units" />
  				<button onClick = {this.handleSubmit}>Enter unit for Event</button>
  			</form>
  		</div>
			)
	}


}
module.exports = DataLogger