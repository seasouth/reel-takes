import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST
} from './authTypes';

const initialState = {
    isLoggedIn: false,
    username: ""
}

const authReducer = (state = initialState, action) => {
    console.log(state);
    console.log(action);
    switch(action.type) {
        case LOGIN_REQUEST:
            console.log("LOGIN_REQUEST");
            return {
                ...state
            }
        case LOGOUT_REQUEST:
            return {
                isLoggedIn: action.payload
            }
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS");
            console.log(action.payload)
            return {
                isLoggedIn: action.payload.isLoggedIn,
                username: action.payload.username
            }
        case LOGIN_FAILURE:
            console.log("LOGIN_FAILURE");
            return {
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}

export default authReducer;