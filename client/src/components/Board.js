import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrenciesList from '@/components/CurrenciesList';
import TrackCurrency from '@/components/TrackCurrency';

class Board extends Component {
  render() {
    if (!this.props.user._id) {
      return <div className='p-6'>
        Please, log in to view currencies list
      </div>
    }
    return <div className='p-6'>
      <TrackCurrency />
      <CurrenciesList />
    </div>
  }
}

export default connect(
  state => ({user: state.user.data})
)(Board);
