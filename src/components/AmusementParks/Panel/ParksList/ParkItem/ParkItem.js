import React, { Component } from 'react';

class ParkItem extends Component {

  onButtonClick = () => {
    this.props.setActivePark(this.props.park);
    if (this.props.isPanelVisible) {
      this.props.toggleSidePanel();
    }
  }

  render(){
    return (
      <button
        onClick={this.onButtonClick}
        className={'park-button ' + (this.props.park === this.props.activePark ? 'active' : '')}
        role='menuitem'
      >{this.props.park.title}
      </button>
    );
  }
}

export default ParkItem;