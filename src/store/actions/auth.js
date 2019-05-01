// actions

import axios from 'axios';

import * as actions from './actionTypes';
import API_KEY from './API';

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFailure = (error) => {
  return {
    type: actions.AUTH_FAILURE,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actions.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
    }

    axios.post(
      url, 
      authData
    )
    .then(res => {
      const expirationDate = new Date( new Date().getTime() + res.data.expiresIn * 1000 );
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch(error => {
      dispatch(authFailure(error.response.data.error));
    })

  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }
    }
  }
}