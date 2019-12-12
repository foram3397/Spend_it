import * as types from "../constants/income.const";

export const setIncomeData = state => {
    return {
        type: types.SET_INCOMEDATA,
        payload: state
    };
};

export const updateIncomeData = state => {
    return {
        type: types.UPDATE_INCOMEDATA,
        payload: state
    };
};

export const deleteIncomeData = state => {
    return {
        type: types.DELETE_INCOMEDATA,
        payload: state
    };
};

export const resetIncomeData = state => {
    return {
        type: types.RESET_INCOMEDATA
    }
}
