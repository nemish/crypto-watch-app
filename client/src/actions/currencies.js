import { createAsyncAction, makeActionCreator } from '@/utils/actions';

export const fetchCurrencies = createAsyncAction({
  event: 'FETCH_CURRENCIES',
  url: 'http://localhost:8080/currencies/',
  authorized: true
});

export const trackCurrency = createAsyncAction({
  event: 'TRACK_CURRENCY',
  url: 'http://localhost:8080/track_currency',
  method: 'post',
  authorized: true
});

export const untrackCurrency = createAsyncAction({
  event: 'UNTRACK_CURRENCY',
  url: 'http://localhost:8080/untrack_currency',
  method: 'post',
  authorized: true
});

