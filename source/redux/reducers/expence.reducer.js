import * as types from "../constants/expence.const";

const Initial_state = {
    expenceData: [],
    neverShowPopup: false
}

export default function setExpenceDataReducer(state = Initial_state, action) {
    switch (action.type) {
        case types.SET_EXPENCEDATA:
            return {
                ...state,
                expenceData: [...state.expenceData, action.payload]
            }
        case types.UPDATE_EXPENCEDATA:
            return {
                ...state,
                expenceData: action.payload
            }
        case types.DELETE_EXPENCEDATA:
            return {
                ...state,
                expenceData: [...state.expenceData.filter(item => item.expenceId !== action.payload)],
            }
        case types.POPUP_EXPENCEDATA:
            return {
                ...state,
                neverShowPopup: action.payload
            }
        case types.RESET_EXPENCEDATA:
            return {
                ...state,
                expenceData: []
            }
        default:
            return state;
    }
}
