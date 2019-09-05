import {request, requestFake} from "./utils";

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
