import {request} from "./utils";

const reducer = 'statisticsReducer';

export const statisticsService = ({dispatch}) => {

    return {

        listDays: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/statistics/days`
        }),

        listChart: (progresser, data) => request({
            dispatch,
            reducer,
            progresser,
            method: 'get',
            data,
            url: `api/statistics/chart`
        }),

    }

}

export const doListDaysStatistics = ({dispatch, params}) =>
    statisticsService({dispatch})
        .listDays('isProgressListDays', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )

export const doListChartStatistics = ({dispatch, params}) =>
    statisticsService({dispatch})
        .listChart('isProgressListChart', params)
        .then(
            (r) => r.data
        )
        .catch(
            (e) => e
        )
