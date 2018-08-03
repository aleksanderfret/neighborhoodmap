import React, { Component } from 'react';
import { connect } from 'react-redux';

class Layout extends Component {
  state={
    expanded: false,
  }

  windowResizeHandler = () => {
    if(window.innerWidth >= 800 && this.props.isPanelVisibleOnMobile) {
      this.props.toggleSidePanel();
      this.setState(() => ({expanded: false}));
    }
  }

  componentDidMount() {
    this.windowResizeHandler();
    window.addEventListener('resize', this.windowResizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      console.log(event.keyCode);
      this.props.toggleSidePanel();
    }
  }

  onMenuButtonClick = () => {
    this.props.toggleSidePanel();
    this.setState((prevState) => (
      {expanded: !prevState.expanded}
    ));
  }

  render() {
    return(
      <React.Fragment>
        <header className='header'>
          <button
            onClick={this.onMenuButtonClick}
            onKeyPress={this.handleKeyPress}
            className='menu-button'
            aria-haspopup="true"
            aria-controls="panel"
            aria-label='menu'
            aria-expanded={this.state.expanded}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1>Amusement Parks Map</h1>
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