import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrencies, untrackCurrency } from '@/actions/currencies';

const RemoveButton = props => <button
  disabled={props.isDeleting}
  className={`${props.isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-dark'} bg-red-light border-red text-white py-2 px-4 rounded`}
  onClick={() => props.untrackCurrency({currency_id: props.item._id}).then(() => props.fetchCurrencies())}>
  Remove
</button>;

const RemoveButtonConnected = connect(
  (state, ownProps) => {
    const { deletingItems } = state.currencies._meta;
    return {isDeleting: deletingItems && deletingItems[ownProps.item._id]};
  },
  dispatch => bindActionCreators({ untrackCurrency, fetchCurrencies }, dispatch)
)(RemoveButton);

const CurrencyRowHead = () => <div className='py-2 border-b-2 flex items-center font-bold'>
  <div className='flex-1'>Name</div>
  <div className='flex-1'>Code</div>
  <div className='flex-1'>Price</div>
  <div className='flex-1'>Last updated</div>
  <div className='flex-1'>Tracks by</div>
  <div className='flex-1'></div>
</div>;

const CurrencyRow = ({item}) => <div className='py-2 border-b-2 flex items-center flex-wrap'>
  <div className='flex-1'>{item.name}</div>
  <div className='flex-1'>{item.code}</div>
  <div className='flex-1'>{item.prices && item.prices.EUR || 'n/a'}</div>
  <div className='flex-1'>{item.lastUpdated || 'not updated'}</div>
  <div className='flex-1'>{item.trackingByUsersCount}</div>
  <div className='flex-1'>
    <RemoveButtonConnected item={item} />
  </div>
</div>;

class CurrenciesList extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
    setInterval(() => {
      this.props.fetchCurrencies();
    }, 10000);
  }

  render() {
    return <div className='w-full max-w-md'>
      <div className='mt-4'>
        <p className='mb-4 text-sm text-grey-dark'>Currencies count: {this.props.items.length}.{this.props.loading ? ' Loading your pocket...' : ''}</p>
        <CurrencyRowHead />
        {this.props.items.map(item => <CurrencyRow key={item.name} item={item} />)}
      </div>
    </div>
  }
}

export default connect(
  state => ({
    items: state.currencies.data.items,
    loading: state.currencies.loading
  }),
  dispatch => bindActionCreators({fetchCurrencies}, dispatch)
)(CurrenciesList);