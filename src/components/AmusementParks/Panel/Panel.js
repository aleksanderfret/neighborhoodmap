import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParksList from './ParksList/ParksList';
import ParksFilter from './ParksFilter/ParksFilter';

class Panel extends Component {

  onPressEscape = (event) => {
    if(this.props.isPanelVisibleOnMobile && event.keyCode === 27){
      this.props.toggleSidePanel();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onPressEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onPressEscape);
  }

  render(){
    return (
      <div
        id='panel'
        className={'panel ' + (this.props.isPanelVisibleOnMobile ? 'open' : '')}
      >
        <h2>Amusemet parks list</h2>
        <ParksFilter/>
        <ParksList/>
      </div>
    );
  }
}

const mapStateToProps =  (state) => ({
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidePanel: () => {dispatch({type: 'TOGGLE_SIDE_PANEL'})}
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);