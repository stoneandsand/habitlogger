import * as d3 from "d3";
import ReactFauxDom from 'react-faux-dom';

var divNode = ReactFauxDOM.createElement('div');

// Set units, margin, sizes
var margin = { top: 10, right: 0, bottom: 10, left: 0 };
var width = 690 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Let D3 create and append an svg to our faux-DOM
var svg = d3.select(divNode).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



 