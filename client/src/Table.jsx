import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import moment from 'moment';

class MuiTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const limit = [];
    for(var i = 0; i < 15; i++) {
      if(this.props.occurrences[i]) {
        limit.push(this.props.occurrences[i]);
      } else {
        break;
      }
    }
    return (
      <div className="table">
        <h1 className="tableName">{this.props.habit}</h1>
        <h2 className="limitInfo">You set your goal/limit to {this.props.limit} {this.props.unit}/{this.props.timeframe}</h2>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>{this.props.unit}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                limit.map((occurence, index) => {
                  let momentDate = moment(occurence.timestamp).format('MMM Do YYYY');
                  return (
                    <TableRow key={occurence._id}>
                      <TableRowColumn>{momentDate}</TableRowColumn>
                      <TableRowColumn>{occurence.value}</TableRowColumn>
                    </TableRow>
                  )
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