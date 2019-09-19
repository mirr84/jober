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
            method: 'get',
            data,
            url: `api/document/add`
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
