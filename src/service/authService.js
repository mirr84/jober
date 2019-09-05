import {request} from "./utils";

const reducer = 'authReducer';

export const authService = ({dispatch}) => {

    return {

        check: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/auth/check`
        }),

        login: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/auth/login`
        }),

    }

}

export const doCheck = ({dispatch}) =>
    authService({dispatch})
        .check('isProgressCheck')
        .then(
            (r) => r
        )
        .catch(
            (e) => e
        )

export const doLogin = ({dispatch, login, password}) =>
    authService({dispatch})
        .login('isProgresLogin', {login, password})
        .then(
            (r) => dispatch.setter( 'authReducer', { token: r.data, isAuth: true } )
        )
        .catch(
            (e) => {}
        )
