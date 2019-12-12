import * as types from "../constants/login.const";

export const setLoginData = state => {
  return {
    type: types.SET_LOGINDATA,
    payload: state
  };
};
