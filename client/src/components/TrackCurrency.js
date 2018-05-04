import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form';

import { trackCurrency, fetchCurrencies } from '@/actions/currencies';
import TrackCurrencyForm from '@/components/TrackCurrencyForm';


class TrackCurrency extends Component {
  _handleSubmit = ({currency}) => {
    return this.props.trackCurrency({
      currency
    }).catch((err) => {
      if (err.errors) {
        throw new SubmissionError(err.errors);
      }
      throw new SubmissionError({_error: 'Track currency failed'});
    }).then(() => {
      this.props.reset('trackCurrency');
      this.props.fetchCurrencies();
    });
  }

  render() {
    return <TrackCurrencyForm onSubmit={this._handleSubmit} />
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({trackCurrency, fetchCurrencies, reset}, dispatch)
)(TrackCurrency);
