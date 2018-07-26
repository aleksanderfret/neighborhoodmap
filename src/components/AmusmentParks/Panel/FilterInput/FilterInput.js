import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class FilterInput extends Component {
  render() {
    return (
      <input
        type='text'
        name='filter'
      />
    );
  }
}

export default FilterInput;