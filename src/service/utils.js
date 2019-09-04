import axios from "axios/index";
import * as querystring from "querystring";

import store from './../index'

export const request = ({dispatch, reducer, progresser, method, data, url}) => {

    dispatch.setter(reducer, {[progresser]: true});

    let {token} = {token: '123'} //store.getState().authReducer;
    let config = {headers: {token}}

    let getData = method === 'get' ? '?' + querystring.stringify(data) : '';

    return axios[method](`/${url}${getData}`, data, config)
        .then(
            (r) => {
                return r;
            }
        )
        .then(
            (r) => {
                dispatch.setter(reducer, {[progresser]: false});
                return r;
            }
        )
        .catch(
            (error) => {
                if (error.response.status === 401) {
                    dispatch.setter(reducer, {token: '', isAuth: false})
                }
                dispatch.setter(reducer, {[progresser]: false});
                throw new Error();
            }
        )

}
