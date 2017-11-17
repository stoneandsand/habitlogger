import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));