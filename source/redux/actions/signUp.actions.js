import * as types from "../constants/signUp.const";

export const setAuthData = state => {
  return {
    type: types.SET_AUTHDATA,
    payload: state
  };
};

export const setUserData = state => {
  return {
    type: types.SET_USERDATA,
    payload: state
  };
};

export const LogOut = () => {
  return {
    type: types.LOGGED_OUT
  };
};
