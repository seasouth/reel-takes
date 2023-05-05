import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './authTypes';
import axios from 'axios';

export const authenticateUser = (username, password) => {
    console.log(username, password);

    const creds = {
        username: username,
        password: password
    };

    return dispatch => {
        dispatch(loginRequest());
        axios.post("http://localhost:8080/user/login", creds)
            .then((response) => {
                dispatch(loginSuccess(response?.data?.name));
            })
            .catch((error) => {
                console.log(error);
                dispatch(loginFailure());
            });
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
    }
}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
    payload: false
})

export const loginSuccess = (username) => {
    console.log(username);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            isLoggedIn: true,
            username: username
        }
    }
}

export const loginFailure = () => {
    return {
        type: LOGIN_FAILURE,
        payload: false
    }
}