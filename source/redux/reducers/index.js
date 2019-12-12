import { combineReducers } from "redux";
import theme from "./theme.reducer";
import language from "./language.reducer";
import setAuthDataReducer from "./signUp.reducer";
import setLoginDataReducer from "./login.reducer";
import setIncomeDataReducer from "./income.reducer";
import setExpenceDataReducer from "./expence.reducer";

export default combineReducers({
  theme,
  language,
  setAuthDataReducer,
  setLoginDataReducer,
  setIncomeDataReducer,
  setExpenceDataReducer
});
