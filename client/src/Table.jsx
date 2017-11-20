import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const MuiTable = (props) => {
  return (
    <MuiThemeProvider>
      <div>
        <h3>Event Table</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Event</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dec 10</td>
              <td>Video Games</td>
              <td>12 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MuiThemeProvider>
  )
};

export default MuiTable;


/*
          {this.props.events.map((event, index) =>
            <tr key={event._id}>
              <td>{event.time}</td>
              <td>{event.name}</td>
              <td>{event.quantity} {event.unit}</td>
            </tr>
          )}
*/