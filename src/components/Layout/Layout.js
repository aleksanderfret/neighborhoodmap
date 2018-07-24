import React from 'react';

const layout = (props) => (
  <React.Fragment>
    <header>
      <h1>Amusment Parks</h1>
    </header>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;