import React from 'react';

const DetailsHours = (props) => {
  return (
    <React.Fragment>
      <h4>Opening hours</h4>
      <table className='props-open-hours'>
        <thead>
          <tr>
            <th>Days</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {props.hours.map((hour, index) => (
            <tr key={index}>
              <td>{hour.day}</td>
              <td>{hour.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default DetailsHours;