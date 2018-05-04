import { createAsyncAction, makeActionCreator } from '@/utils/actions';

export const LOGOUT = 'LOGOUT';

export const fetchCurrentUser = createAsyncAction({
  event: 'FETCH_CURRENT_USER',
  url: 'http://localhost:8080/fetch_current_user',
  authorized: true
});

export const login = createAsyncAction({
  event: 'LOGIN',
  url: 'http://localhost:8080/login',
  method: 'post'
});

export const logout = makeActionCreator(LOGOUT);
