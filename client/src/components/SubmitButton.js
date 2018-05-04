import React from 'react';

export default ({submitting, pristine, invalid, title='Submit'}) => <button disabled={submitting || pristine || invalid}
  disabled={submitting || pristine || invalid}
  className={`${submitting || pristine || invalid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-dark'} bg-green text-white py-2 px-4 rounded`}
  type='submit'>
  {title}
</button>