import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { login } from '@/actions/user';
import LoginForm from '@/components/LoginForm';

class Login extends Component {
  _handleSubmit = (data) => {
    return this.props.login(data).then((respData) => {
      localStorage.setItem('jwt_token', respData.token);
      this.props.history.push('/');
    }).catch((err) => {
      if (err.errors) {
        throw new SubmissionError(err.errors || {_error: 'Login failed'});
      }
    });
  }

  render() {
    return <div className='flex flex-1 flex-col justify-center items-center'>
      <LoginForm onSubmit={this._handleSubmit} />
    </div>
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({login}, dispatch)
)(withRouter(Login));
