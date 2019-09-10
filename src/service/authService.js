import {request} from "./utils";
import * as md5 from "md5";

import {message} from 'antd';

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
            (r) => {}
        )
        .catch(
            (e) => {}
        )

export const doLogin = ({dispatch, login, password}) =>
    authService({dispatch})
        .login('isProgressLogin', {login, password: md5(password)})
        .then(
            (r) => {
              dispatch.setter( 'authReducer', { token: r.data, isAuth: true } );
              message.success('Login complete!');
            }
        )
        .catch(
            (e) => {
              message.error('Login fail!');
            }
        )

export const doRegistration = ({dispatch, login, password, email}) =>
    authService({dispatch})
        .reg('isProgressReg', {login, password: md5(password), email})
        .then(
            (r) => {
              message.success('Registration complete!');
            }
        )
        .catch(
            (e) => {
              message.error('Registration fail!');
            }
        )

export const doLogout = ({dispatch}) =>
    authService({dispatch})
        .logout('isProgressLogout')
        .then(
            (r) => {
              dispatch.setter( 'authReducer', { token: null, isAuth: false } );
              message.success('Logout complete!')
             }
        )
        .catch(
            (e) => {
              message.error('Logout fail!');
            }
        )
