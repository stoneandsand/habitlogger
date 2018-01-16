import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, CalendarControls } from 'react-yearly-calendar';

class LoggerCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      showWeekSeparators: false,
    };
  }
  render() {
    return (
      <div id="calendar">
        <CalendarControls year={2017} selectedDay={this.state.currentDate} />
        <Calendar showWeekSeparators={this.state.showWeekSeparators} />
      </div>
    );
  }
}

Calendar.propTypes = {};

export default LoggerCalendar;

