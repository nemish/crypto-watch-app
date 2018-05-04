import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { user } from '@/reducers/user';
import { currencies } from '@/reducers/currencies';

export default combineReducers({
    user,
    currencies,
    form
});
