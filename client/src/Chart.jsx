import React from 'react';
import ReactFauxDOM from 'react-faux-dom';

import * as d3 from 'd3';
import axios from 'axios';


class Chart extends React.Component {
 	constructor(props) {
 		super(props);

 		this.state = {
      width: 500,
      height: 500,
      data: [
        {
          "timestamp":"2017-10-22T14:34:15.075Z",
          "value":125,
          "notes": "had a great day, sunny outside."
        },
        {
          "timestamp":"2017-11-23T14:34:15.075Z",
          "value":3,
          "notes": "Car accident."
        },
        {
          "timestamp":"2017-12-22T14:34:15.075Z",
          "value":4,
          "notes": "had a great day, sunny outside."
        }
     ],
     habitData: [
       "habit":"smoking",
       "goal":5,
       "unit":"packs",
       "timeframe":"day",
       "deadline": "2017-12-31T14:38:15.074Z"
     ]
    };
  }


  render() {
    let data = this.state.data;
    console.log('DATA >>>>>>>>>', data)

    var valueRange = this.state.data.reduce((acc, cur) => {
      acc.push(cur.value);
      return acc;
    }, [])

    var dateRange = this.state.data.reduce((acc, cur) => {
      acc.push(cur.timestamp);
      return acc;
    }, [])

    var strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    var parsedDates = strictIsoParse(dateRange[0]);
    console.log('parsedDates', parsedDates);

    var mappedDates = dateRange.map((e, i) => {
      return strictIsoParse(e);
    });
    console.log('mapped dates', mappedDates);

    console.log("min value", Math.min.apply(null, valueRange));
    let padding = 25;
    let margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = this.state.width - margin.left - margin.right,
      height = this.state.height - margin.top - margin.bottom

    let x = d3.scaleLinear() //scaleBand
      .rangeRound([0, width])

    let y = d3.scaleLinear()
      .domain([Math.max.apply(null, valueRange), Math.min.apply(null, valueRange)])
      .range([0, height]);

    let xAxis = d3.axisBottom()
      .scale(x)
      .ticks(10, "%");

    let yAxis = d3.axisLeft()
      .scale(y)


    //Create the element
    const div = new ReactFauxDOM.Element('div')

    //Pass it to d3.select and proceed as normal
    let svg = d3.select(div).append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      .style('background-color', '#00695C')
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


      // x.domain(data.map((d) => d.letter));
      // y.domain([0, d3.max(data, (d) => d.frequency)]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 4)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

    var circle = svg.append("circle")
     .attr("cx", 30)
     .attr("cy", 300)
     .attr("r", 50)
     .style('stroke', '#22BB66')
     .style('fill', 'transparent')

    var rect = svg.append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 50)
      .attr('height', 100)

    var rect3 = svg.append('rect')
      .attr('x', 100)
      .attr('y', 200)
      .attr('width', 50)
      .attr('height', 100)

    var rect2 = svg.append('rect')
      .attr('x', 200)
      .attr('y', 100)
      .attr('width', 50)
      .attr('height', 100)

    d3.selectAll('rect')
      .data(valueRange)
      .attr('x', (d, i) => d + 25)
      .attr('y', (d, i) => i)

    var rectColor = d3.selectAll("rect").style("color", function() {
      console.log("selected all rects", this);
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });

    return div.toReact()
  }

}

export default Chart;


 //   svg.selectAll(".bar")
//     .data(data)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", (d) => x(d.letter))
//     .attr("width", 20)
//     .attr("y", (d) => y(d.frequency))
//     .attr("height", (d) => {return height - y(d.frequency)});

//   //DOM manipulations done, convert to React

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


