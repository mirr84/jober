import {request} from "./utils";

const reducer = 'categoryReducer';

export const categoryService = ({dispatch}) => {

    return {

        list: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/category/list`
        }),

        update: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'post',
            data,
            url: `api/category/update`
        }),

    }

}

export const doListCategoty = ({dispatch, params}) =>
    categoryService({dispatch})
        .list('isProgressList', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )

export const doUpdateCategoty = ({dispatch, params}) =>
    categoryService({dispatch})
        .update('isProgressUpdate', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )
