import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

// This solution to place icons on map is taken from:
// https://gist.github.com/jgimbel/6a36d60e28aaf453d0093ddc47f36533
 class ParkMapControls extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div')
    this.map.controls[this.props.position].push(this.controlDiv)
  }
  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
  }
  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}

export default ParkMapControls;