import React from 'react';
import ReactDOM from 'react-dom';
import ArrowLeftSVG from '../../media/icons/Linearicons/SVG/arrow-left.svg';
let node;
class Larrow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1.5, {x: 155, y: 42, width: 30, height: 30})
  }
  componentWillReceiveProps(nextProps) {
    let change = {y: 39};
    let time = 1;
    if(nextProps.currentFocus === 1) {
      change['y'] = 90;
    }
    if (nextProps.currentFocus === 2) {
      change['y'] = 140;
    }
    if (nextProps.currentFocus === 3) {
      change['y'] = 186;
      change['x'] = 130;
      change['ease'] = Bounce.easeOut;
      time = 2;
    }
    if (nextProps.currentFocus === 4) {
      change['y'] = 254;
      change['ease'] = Bounce.easeOut;
      time = 2;
    }
    if (nextProps.currentFocus === 5) {
      change['y'] = 255;
      change['x'] = 250;
      change['width'] = 50;
      change['height'] = 50;
      change['opacity'] = 0;
    }
    TweenMax.to(node, time, change)
  }
  render(){
    return (
      <img src={ArrowLeftSVG} alt="lukeg" x="330" height="400px"/>
      )
  }
}

export default Larrow;