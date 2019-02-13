import React from 'react';

const DataForm = props => {
  return (
    <div className='h-flex'>
      <p>{props.name}</p>
      <p>{props.value}</p>
      <p>
        <button
          name={props.name}
          className='close-btn'
          onClick={props.deleteColumn}
        >
          &#10006;
        </button>
      </p>
    </div>
  );
};

export default DataForm;
