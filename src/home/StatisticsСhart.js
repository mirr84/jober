import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip} from 'antd';

import {doListDaysStatistics} from "../service/statisticsService";

import Menu from './Menu';

let modeCalendar = 'month';
let calendarData = [];

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init StatisticsСhart');

        secure && doCheck({dispatch})
    }
}

const StatisticsСhart = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

      <Tooltip title={'calendar'} placement="bottomLeft">
            <Button size={'small'}
                     type="primary"
                     icon="calendar"
                     onClick={() => history.push(`/statistics/calendar`)}/>
      </Tooltip>

        {' '}

      <Tooltip title={'chart'} placement="bottomLeft">
            <Button size={'small'}
                    type="primary"
                    icon="area-chart"
                    onClick={() => history.push(`/statistics/chart`)}/>
      </Tooltip>

      <Divider dashed />

      StatisticsСhart

    </Spin>
  </div>

export default connector({methods, component: StatisticsСhart});
