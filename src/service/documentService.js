import {request} from "./utils";

const reducer = 'documentReducer';

export const documentService = ({dispatch}) => {

    return {

        list: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/document/list`
        }),

        update: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'post',
            data,
            url: `api/document/update`
        }),

        add: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'post',
            data,
            url: `api/document/add`
        }),

        delete: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/document/delete`
        }),

        get: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/document/get`
        }),

    }

}

export const doListDocument = ({dispatch, params}) =>
    documentService({dispatch})
        .list('isProgressList', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )

export const doUpdateDocument = ({dispatch, params}) =>
    documentService({dispatch})
        .update('isProgressUpdate', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )

export const doAddDocument = ({dispatch, params}) =>
    documentService({dispatch})
        .add('isProgressAdd', params)
        .then(
            (r) => r
        )
        .catch(
            (e) => e
        )


export const doDeleteDocument = ({dispatch, params}) =>
    documentService({dispatch})
        .delete('isProgressDelete', params)
        .then(
            (r) => r
        )
        .catch(
            (e) => e
        )

export const doGetDocument = ({dispatch, params}) =>
    documentService({dispatch})
        .get('isProgressGet', params)
        .then(
            (r) => r
        )
        .catch(
            (e) => e
        )
