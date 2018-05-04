import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import TrackCurrencySelect from '@/components/TrackCurrencySelect';
import SubmitButton from '@/components/SubmitButton';

const validate = values => {
  const errors = {}
  if (!values.currency) {
    errors.currency = 'Required'
  }

  return errors
}

class TrackCurrencyForm extends Component {
  render() {
    const { handleSubmit, submitting, pristine, invalid, error } = this.props;

    return <div className='w-full max-w-md'>
      <form className='bg-white rounded relative' onSubmit={handleSubmit}>
        <div className='flex'>
          <Field component={TrackCurrencySelect} className='flex-1 mr-2' name='currency' id='currency' placeholder='Track currency' />
          <SubmitButton {...{submitting, pristine, invalid}} />
        </div>
        {error && <p className='form-error'>{error}</p>}
      </form>
    </div>;
  }
}


export default reduxForm({
  form: 'trackCurrency',
  validate
})(TrackCurrencyForm);