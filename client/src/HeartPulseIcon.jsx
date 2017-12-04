import React from 'react';
import ReactDOM from 'react-dom';
import HeartPulseSVG from '../../media/icons/Linearicons/SVG/heart-pulse.svg';
let node;
class HeartPulse extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1.5, {x: -10, y: 31, width: 30, height: 30, ease:Bounce.easeOut})
  }
  componentWillReceiveProps(nextProps) {
    let change = {opacity: 1, y: 1, x: -10};
    let time = 1;
    TweenMax.to(node, time, change)
  }
  render(){
    return (
      <img src={HeartPulseSVG} style={{"opacity": "0"}} alt="lukeg" />
      )
  }
}

export default HeartPulse;