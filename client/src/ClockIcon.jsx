import React from 'react';
import ReactDOM from 'react-dom';
import ClockSVG from '../../media/icons/Linearicons/SVG/clock.svg';
let node;
class Clock extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 5, {opacity: 1, x: 0, y: 0, width: 30, ease:Bounce.easeOut})
  }
  componentWillReceiveProps(nextProps) {

  }
  render(){
    return (
      <img src={ClockSVG} style={{'display': 'inline-block', 'opacity': '0'}} alt="lukeg" height="40px" width="40px"/>
      )
  }
}

export default Clock;