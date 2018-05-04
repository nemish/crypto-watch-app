import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '@/components/Login';
import Board from '@/components/Board';
import Toolbar from '@/components/Toolbar';

import * as userActions from '@/actions/user';


class App extends Component {
  componentDidMount() {
    if (!this.props.user._id) {
      this.props.fetchCurrentUser().then(() => {
        this.props.history.push('/');
      }).catch(() => {
        this.props.history.push('/login');
      });
    }
  }

  render() {
    return <div className='h-screen flex flex-col'>
      <Toolbar />
      <Route exact path="/" component={Board} />
      <Route exact path="/login" component={Login} />
    </div>
  }
}

export default connect(
  state => ({user: state.user.data}),
  dispatch => bindActionCreators(userActions, dispatch)
)(App);