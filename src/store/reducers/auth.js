// reducers

import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null, 
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, { 
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
   });
};

const authFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START: return authStart(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAILURE: return authFailure(state, action);
    case actions.AUTH_LOGOUT: return authLogout(state, action);
    case actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default reducer;