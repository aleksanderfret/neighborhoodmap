import React, { Component } from 'react';
import { connect } from 'react-redux';

class Layout extends Component {

  windowResizeHandler = () => {
    if(window.innerWidth >= 800 && this.props.isPanelVisibleOnMobile) {
      this.props.toggleSidePanel();
    }
  }

  componentDidMount() {
    this.windowResizeHandler();
    window.addEventListener("resize", this.windowResizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResizeHandler);
  }

  render() {
    return(
      <React.Fragment>
        <header className='header'>
          <button
            onClick={this.props.toggleSidePanel}
            className='menu-button'
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>Amusment Parks</h1>
        </header>
        <main>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps =  (state) => ({
  isPanelVisibleOnMobile: state.isPanelVisibleOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidePanel: () => {dispatch({type: 'TOGGLE_SIDE_PANEL'})}
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);