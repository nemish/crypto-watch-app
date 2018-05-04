import { createAsyncAction, makeActionCreator } from '@/utils/actions';
import { HOST } from '@/config';

export const LOGOUT = 'LOGOUT';

export const fetchCurrentUser = createAsyncAction({
  event: 'FETCH_CURRENT_USER',
  url: `${HOST}/fetch_current_user`,
  authorized: true
});

export const login = createAsyncAction({
  event: 'LOGIN',
  url: `${HOST}/login`,
  method: 'post'
});

export const logout = makeActionCreator(LOGOUT);
