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
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>Dec 10</TableRowColumn>
            <TableRowColumn>4 hours</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Dec 11</TableRowColumn>
            <TableRowColumn>5 hours</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Dec 12</TableRowColumn>
            <TableRowColumn>6 hours</TableRowColumn>
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