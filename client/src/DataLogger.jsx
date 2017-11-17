import React from 'react';
import Select from 'react-select';

class DataLogger extends React.Component {
	constructor(props) {
		super(props);
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			eventList: [{ label: 'butterfly' }, { label: 'coke' }, { label: 'pegions' }],
			currentEvent: 'No events Selected',
		};
		this.logChange = this.logChange.bind(this);
	}

	logChange(e) {
		this.setState({ currentEvent: `Current Event ${e.label}` });
	}
	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	var dataLog = document.forms.logInput;
	// 	this.props.logItem(dataLog, 'placeholder');
	// 	onClick = {this.handleSubmit}
	// }

	render() {
		return (
      <div>
        <Select
          name="form-field-name"
          label="butterfly"
					options={this.state.eventList}
					onChange={this.logChange}
				/>
        <p>{this.state.currentEvent}</p>
        <hr />
        <form name="logInput">
          <input type="number" name="units" />
          <button>Enter unit for Event</button>
				</form>
			</div>
		);
	}
}

export default DataLogger;
