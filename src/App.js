import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import AmusmentParks from './components/AmusmentParks/AmusmentParks';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <AmusmentParks />
        </Layout>
      </div>
    );
  }
}

export default App;
