import React from 'react';
import ReactDOM from 'react-dom';
import ArrowDownSVG from '../../media/icons/Linearicons/SVG/arrow-down.svg';
let node;
class Darrow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1, {y: 310, x: 540})
  }
  componentWillReceiveProps(nextProps) {
    let change = {y: 39};
    let time = 1;
    if (nextProps.currentFocus === 5) {
      change['opacity'] = 1
      change['y'] = 290;
      change['ease'] = Bounce.easeOut;
      time = 2;
    }
    TweenMax.to(node, time, change)
  }
  render(){
    return (
      <img src={ArrowDownSVG} style={{"opacity": "0"}} alt="lukeg" height="30" width="30" />
      )
  }
}

export default Darrow;