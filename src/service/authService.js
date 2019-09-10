import {request} from "./utils";
import * as md5 from "md5";

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

        reg: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/auth/reg`
        }),

        logout: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/auth/logout`
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
        .login('isProgressLogin', {login, password: md5(password)})
        .then(
            (r) => dispatch.setter( 'authReducer', { token: r.data, isAuth: true } )
        )
        .catch(
            (e) => {}
        )

export const doRegistration = ({dispatch, login, password, email}) =>
    authService({dispatch})
        .reg('isProgressReg', {login, password: md5(password), email})

export const doLogout = ({dispatch}) =>
    authService({dispatch})
        .logout('isProgressLogout')
        .then(
            (r) => dispatch.setter( 'authReducer', { token: null, isAuth: false } )
        )
        .catch(
            (e) => {}
        )
