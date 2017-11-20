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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Event</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
          <TableRowColumn>Dec 10</TableRowColumn>
          <TableRowColumn>Video Games</TableRowColumn>
          <TableRowColumn>4 hours</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
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