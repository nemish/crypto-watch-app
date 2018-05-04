import { createCombinedFetchReducer } from '../utils/reducers';
import { fetchCurrentUser, login, LOGOUT } from '../actions/user';

export const user = createCombinedFetchReducer({}, [{
  event: fetchCurrentUser.conf.event
}, {
  event: login.conf.event,
  successProcessor: (state, {data}) => {
    return {
      _meta: {
        ...state._meta,
        token: data.token
      }
    };
  }
}], {
  callbacks: {
    [LOGOUT]: (state, action) => user.initialState
  }
});