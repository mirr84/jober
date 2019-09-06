import {request} from "./utils";

const reducer = 'accountReducer';

export const accountService = ({dispatch}) => {

    return {

        list: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/account/list`
        }),

    }

}

export const doListAccount = ({dispatch}) =>
    accountService({dispatch})
        .list('isProgressList')
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )
