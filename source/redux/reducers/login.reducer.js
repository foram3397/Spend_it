import * as types from "../constants/login.const";

const Initial_state = {
    loginData: []
}

export default function setLoginDataReducer(state = Initial_state, action) {
  switch (action.type) {
    case types.SET_LOGINDATA:
      return {
        ...state,
        loginData: action.payload
      };
    default:
      return state;
  }
}