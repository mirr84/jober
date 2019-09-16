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

        add: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'post',
            data,
            url: `api/account/add`
        }),

    }

}

export const doListAccount = ({dispatch, params}) =>
    accountService({dispatch})
        .list('isProgressList', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )

export const doAddAccount = ({dispatch, params}) =>
    accountService({dispatch})
        .add('isProgressAdd', params)
        .then(
            (r) => {}
        )
        .catch(
            (e) => {}
        )
