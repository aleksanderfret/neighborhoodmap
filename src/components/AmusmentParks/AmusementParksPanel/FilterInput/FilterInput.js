import React, { Component } from 'react';
import debounce from 'lodash.debounce';
console.log(debounce);

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