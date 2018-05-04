import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '@/actions/user';
import SubmitButton from '@/components/SubmitButton';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.passwd) {
    errors.passwd = 'Required';
  } else if (values.passwd.length < 6) {
    errors.passwd = 'Password should contain at least 6 symbols';
  }

  return errors
}

const renderField = ({input, type, label, placeholder, meta: { touched, error, warning }}) => {
  const { name } = input;
  return <Fragment>
    <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor={name}>
      {label}
    </label>
    <input {...input} className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
           type={type} placeholder={placeholder} id={name} />
    {touched && error && (<p className="form-error">{error}</p>)}
  </Fragment>
}

class LoginForm extends Component {
  render() {
    const { handleSubmit, submitting, pristine, invalid, error } = this.props;
    let errors = null;
    if (error) {
      errors = <p className='form-error'>{error}</p>;
    }

    return <div className='w-full max-w-xs mx-4'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        {errors}
        <div className='mb-4'>
          <Field component={renderField} type='text' name='name' id='name' placeholder='Type your username' label='Username' />
        </div>
        <div className='mb-6'>
          <Field component={renderField} type='password' name='passwd' id='password' placeholder='Your password' label='Password' />
        </div>
        <div className='flex items-center justify-between'>
          <SubmitButton {...{submitting, pristine, invalid}} />
        </div>
      </form>
      <span className='block text-center text-grey-darker text-sm mt-2'>*User will be created if not exists in DB</span>
    </div>
  }
}


export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);