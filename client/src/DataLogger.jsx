import React from 'react';
import ReactDOM from 'react-dom';

class DataLogger extends React.Component {
	constructor(props) {
		super(props);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	var dataLog = document.forms.logInput;
	// 	this.props.logItem(dataLog, 'placeholder');
	// 	onClick = {this.handleSubmit}
	// }


	render() {
		return(
			<div>			
				<form name="logInput">
  				<input type="number" name="units" />
  				<button>Enter unit for Event</button>
  			</form>
  		</div>
			)
	}


}
module.exports = DataLogger