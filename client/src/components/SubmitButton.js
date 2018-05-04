import React from 'react';

export default ({submitting, pristine, invalid, title='Submit'}) => {
  const disabled = submitting || pristine || invalid;
  return <button
    disabled={disabled}
    className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-dark'} bg-green text-white py-2 px-4 rounded`}
    type='submit'>
    {title}
  </button>
}