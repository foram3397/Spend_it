import * as types from "../constants/expence.const";

export const setExpenceData = state => {
    return {
        type: types.SET_EXPENCEDATA,
        payload: state
    };
};

export const updateExpenceData = state => {
    return {
        type: types.UPDATE_EXPENCEDATA,
        payload: state
    };
};

export const popupExpenceData = state => {
    return {
        type: types.POPUP_EXPENCEDATA,
        payload: state
    };
};

export const deleteExpenceData = state => {
    return {
        type: types.DELETE_EXPENCEDATA,
        payload: state
    };
};

export const resetExpenceData = state => {
    return {
        type: types.RESET_EXPENCEDATA
    }
}
