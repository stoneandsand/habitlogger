import React from 'react';
import ReactDOM from 'react-dom';
import HeartSVG from '../../media/icons/Linearicons/SVG/heart.svg';
let node;
class Heart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1.5, {x: 20, y: 1, width: 30, height: 30, ease:Bounce.easeOut})
  }
  componentWillReceiveProps(nextProps) {
    let change = {opacity: 0, y: 30};
    let time = 1;
    TweenMax.to(node, time, change)
  }
  render(){
    return (
      <img src={HeartSVG} alt="lukeg" />
      )
  }
}

export default Heart;