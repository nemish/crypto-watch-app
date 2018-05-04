import { HOST } from '@/config';
import { createAsyncAction, makeActionCreator } from '@/utils/actions';

export const fetchCurrencies = createAsyncAction({
  event: 'FETCH_CURRENCIES',
  url: `${HOST}/currencies/`,
  authorized: true
});

export const trackCurrency = createAsyncAction({
  event: 'TRACK_CURRENCY',
  url: `${HOST}/track_currency`,
  method: 'post',
  authorized: true
});

export const untrackCurrency = createAsyncAction({
  event: 'UNTRACK_CURRENCY',
  url: `${HOST}/untrack_currency`,
  method: 'post',
  authorized: true
});

