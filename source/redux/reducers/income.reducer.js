import * as types from "../constants/income.const";

const Initial_state = {
    incomeData: []
}

export default function setIncomeDataReducer(state = Initial_state, action) {
    switch (action.type) {
        case types.SET_INCOMEDATA:
            return {
                ...state,
                incomeData: [...state.incomeData, action.payload]
            }
        case types.UPDATE_INCOMEDATA:
            return {
                ...state,
                incomeData: action.payload
            }
        case types.DELETE_INCOMEDATA:
            return {
                ...state,
                incomeData: [...state.incomeData.filter(item => item.incomeId !== action.payload)],
            }
        case types.RESET_INCOMEDATA:
            return {
                ...state,
                incomeData: []
            }
        default:
            return state;
    }
}
