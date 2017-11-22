import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class MuiTable extends React.Component {
  constructor(props) {
    super(props);
    // will be using props when connected to server/db
    // change appropriate lookups
    this.state = {
      habit: 'Video Games',
      limit: 7,
      unit: 'Hours',
      timeframe: 'Day',
      occurrences: [
        {_id: 0, timestamp: '20 Dec 17', value: '2'},
        {_id: 1, timestamp: '22 Dec 17', value: '4'},
        {_id: 2, timestamp: '23 Dec 17', value: '6'},
        {_id: 3, timestamp: '26 Dec 17', value: '5'},
        {_id: 4, timestamp: '28 Dec 17', value: '2'},
        {_id: 5, timestamp: '28 Dec 17', value: '1'}
      ],
    };
  }

  render() {
    return (
      <div>
        <h1 className="tableName">{this.state.habit}</h1>
        <h2 className="limitInfo">You set your limit to {this.state.limit} {this.state.unit}/{this.state.timeframe}</h2>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>{this.state.unit}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.state.occurrences.map((occurence, index) => {
                  return (
                    <TableRow key={occurence._id}>
                      <TableRowColumn>{occurence.timestamp}</TableRowColumn>
                      <TableRowColumn>{occurence.value}</TableRowColumn>
                    </TableRow>
                  )
                  counter++;
                })
              }
            </TableBody>
          </Table>
      </div>
    )
  }
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