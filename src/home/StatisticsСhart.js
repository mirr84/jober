import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip, Row, Col} from 'antd';
import { Pie } from 'ant-design-pro/lib/Charts';

import {doListDaysStatistics} from "../service/statisticsService";

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init StatisticsСhart');

        secure && doCheck({dispatch})
    }
}

const minusPieData = [
  {
    x: 'расход 1',
    y: 111,
  },
  {
    x: 'расход 2',
    y: 222,
  },
  {
    x: 'расход 3',
    y: 333,
  },
  {
    x: 'расход 4',
    y: 444,
  }
];

const plusPieData = [
  {
    x: 'доход 1',
    y: 111,
  },
  {
    x: 'доход 2',
    y: 222,
  },
  {
    x: 'доход 3',
    y: 333,
  },
  {
    x: 'доход 4',
    y: 444,
  }
];

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

        filter

      <Divider dashed />

      <Row>
        <Col span={10}>
          <Pie
            hasLegend
            title="title"
            subTitle="subTitle"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: plusPieData.reduce((pre, now) => now.y + pre, 0),
                }}
              />
            )}
            data={plusPieData}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
            height={294}
          />
        </Col>
        <Col span={2} />
        <Col span={10}>
          <Pie
            hasLegend
            title="title"
            subTitle="subTitle"
            total={() => (
              <span
                dangerouslySetInnerHTML={{
                  __html: minusPieData.reduce((pre, now) => now.y + pre, 0),
                }}
              />
            )}
            data={minusPieData}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
            height={294}
          />
        </Col>
        <Col span={2} />
      </Row>
      <Divider dashed />

      график по датам

    </Spin>
  </div>

export default connector({methods, component: StatisticsСhart});
