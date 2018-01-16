import React from 'react';
import ReactDOM from 'react-dom';
import PieChartSVG from '../../media/icons/Linearicons/SVG/PieChart.svg';
let node;
class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1.5, {x: 170, y: 39, width: 30, height: 30})
  }
  componentWillReceiveProps(nextProps) {
  }
  render(){
    return (
      <img src={PieChartSVG} alt="lukeg" />
      )
  }
}

export default Larrow;