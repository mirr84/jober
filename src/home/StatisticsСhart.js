import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip, Row, Col, DatePicker} from 'antd';
import { Pie } from 'ant-design-pro/lib/Charts';

import {doListChartStatistics} from "../service/statisticsService";

import Menu from './Menu';

const { RangePicker } = DatePicker;

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init StatisticsСhart');

        secure && doCheck({dispatch})
        .then(
          () => {
            let dateStrings = [moment().startOf('month').format('DD.MM.YYYY'), moment().endOf('month').format('DD.MM.YYYY')];
            onChange({dispatch, dateStrings})
          }
        )
    }
}

let minusPieData = [];
let plusPieData = [];

const onChange = ({dispatch, dates, dateStrings}) => {
  let d1 = moment(dateStrings[0], 'DD.MM.YYYY');
  let d2 = moment(dateStrings[1], 'DD.MM.YYYY');
  if (d1.isValid() && d2.isValid()) {
    doListChartStatistics({dispatch, params: {dateStrings}})
    .then(
      (r) => {
        plusPieData = r.plusPieData || [];
        minusPieData = r.minusPieData || [];
        dispatch.setter( 'statisticsReducer', {} )
      }
    )
  } else {
    // clean
    plusPieData = [];
    minusPieData = [];
    dispatch.setter( 'statisticsReducer', {} )
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

        <RangePicker
          format={"DD.MM.YYYY"}
          defaultValue={[moment().startOf('month'), moment().endOf('month')]}
          ranges={{
            "Сегодня": [moment(), moment()],
            "Неделя": [moment().startOf('week'), moment().endOf('week')],
            "Текущий месяц": [moment().startOf('month'), moment().endOf('month')],
            "Текущий год": [moment().startOf('year'), moment().endOf('year')],
          }}
          onChange={(dates, dateStrings) => onChange({dispatch, dates, dateStrings})}
        />

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
