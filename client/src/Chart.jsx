import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

const divNode = ReactFauxDOM.createElement('div');



class Chart extends React.Component {
  constructor(props) {
  	super(props);


  }

  render(){
    return divNode.toReact();
  }
}





// Create a faux-DOM 'div' element



// Set units, margin, sizes
const margin = { top: 10, right: 0, bottom: 10, left: 0 };
const width = 690 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create our React element structure via JSX
<div>
  <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
    <g transform={"translate(" + margin.left + "," + margin.top + ")"}></g>
  </svg>
</div>

