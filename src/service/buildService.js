import {request} from "./utils";

const reducer = 'buildReducer';

export const buildService = ({dispatch}) => {

    return {

        list: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/build/list`
        }),

    }

}

export const doListBuild = ({dispatch}) =>
    buildService({dispatch})
        .list('isProgressList')
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )
