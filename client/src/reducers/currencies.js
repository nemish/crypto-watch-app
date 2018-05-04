import { createCombinedFetchReducer } from '../utils/reducers';
import { fetchCurrencies, untrackCurrency } from '../actions/currencies';

export const currencies = createCombinedFetchReducer({items: [], _meta: {}}, [{
  event: fetchCurrencies.conf.event,
}, {
  event: untrackCurrency.conf.event,
  dataProcessor(data, state) {
    return {...state.data};
  },
  startProcessor: (state, action) => {
    return {_meta: {...state._meta, deletingItems: {
      ...(state._meta.deletingItems || {}),
      id: action.data.currency_id
    }}}
  },
  successProcessor: (state, action) => {
    return {_meta: {...state._meta, deletingItems: {
      ...state._meta.deletingItems,
      [action.data.currency_id]: null
    }}};
  },
  failProcessor: (state, action) => {
    return {_meta: {...state._meta, deletingItems: {
      ...state._meta.deletingItems,
      [action.data.currency_id]: null
    }}};
  }
}]);
