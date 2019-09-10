import axios from "axios/index";
import * as querystring from "querystring";

export const request = ({dispatch, reducer, progresser, method, data, url}) => {

    dispatch.setter(reducer, {[progresser]: true});

    let getData = method === 'get' ? '?' + querystring.stringify(data) : '';

    return axios[method](`/${url}${getData}`, data)
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
                    dispatch.setter(reducer, {token: null, isAuth: false})
                }
                if (error.response.status === 500) {
                    dispatch.setter(reducer, {isAuth: false})
                }
                dispatch.setter(reducer, {[progresser]: false});
                throw new Error();
            }
        )

}
