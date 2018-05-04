import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '@/actions/user';

const LogoutButton = props => <button onClick={props.click} className='tb-btn'>Logout</button>;

const LogoutButtonConnected = connect(null, dispatch => ({
    click: () => {
      dispatch(logout());
      localStorage.setItem('jwt_token', null);
    }
}))(LogoutButton);


const Toolbar = props => {
  let userText = 'You are not logged in';
  let buttons = <Link to='/login' className='tb-btn'>Login</Link>;
  if (props.user._id) {
    userText = `Logged in as ${props.user.name}`;
    buttons = <LogoutButtonConnected />
  }
  return <nav className='flex flex-wrap items-center justify-between bg-indigo p-3'>
    <div className='flex items-center flex-no-shrink text-white py-2'>
      <span className='font-semibold text-xl tracking-tight'>{userText}</span>
    </div>
    {buttons}
  </nav>
}


export default connect(state => ({user: state.user.data}))(Toolbar);