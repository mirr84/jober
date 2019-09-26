import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin} from 'antd';

import {doListDaysStatistics} from "../service/statisticsService";

import Menu from './Menu';

let modeCalendar = 'month';
let calendarData = [];

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Statistics');

        modeCalendar = 'month';
        calendarData = [];

        secure && doCheck({dispatch})
          .then(
            () => fetch(dispatch)
          )
    }
}

const fetch = (dispatch, type = 'month', m = moment()) =>
  doListDaysStatistics({dispatch, params: {type, y: m.year(), m: m.month() + 1} }) // year
    .then(
      (d) => {
        calendarData = d;
        dispatch.setter( 'statisticsReducer', {} )
      }
    )

const getListData = (value) => {

  let listData;
  let t = calendarData
    .filter(
      a => a.date == value.format('DD.MM.YYYY')
    )
    .map(
      a => {
        let minus = 0;
        let plus = 0;
        if (a.direct === -1) minus = a.summ;
        if (a.direct === 1) plus = a.summ;
        return { date: a.date, minus, plus }
      }
    )

  if (t.length > 0) {
    listData = {
        d: [
            { type: 'success', content: t[0].plus + (t.length > 1 ? t[1].plus : 0) },
            { type: 'error', content: t[0].minus + (t.length > 1 ? t[1].minus : 0) },
            { type: 'processing', content:  t[0].plus + (t.length > 1 ? t[1].plus : 0) - t[0].minus + (t.length > 1 ? t[1].minus : 0) },
          ],
        c: t[0].plus + (t.length > 1 ? t[1].plus : 0) - t[0].minus + (t.length > 1 ? t[1].minus : 0) > 0 ? '#7fffd44f' : '#e91e6314'
    };
  }

  return listData || {d:[]};
}

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events"
        style={{ background: listData.c }}
      >
      {listData.d.map((item, idx) => (
        <li key={'id_'+idx}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

const getMonthData = (value) => {

  let listData;
  let t = calendarData
    .filter(
      a => moment(a.date, 'DD.MM.YYYY').format('MM.YYYY') == value.format('MM.YYYY')
    )
    .map(
      a => {
        let minus = 0;
        let plus = 0;
        if (a.direct === -1) minus = a.summ;
        if (a.direct === 1) plus = a.summ;
        return { date: a.date, minus, plus }
      }
    )

    if (t.length > 0) {
      listData = {
          d: [
              { type: 'success', content: t[0].plus + (t.length > 1 ? t[1].plus : 0) },
              { type: 'error', content: t[0].minus + (t.length > 1 ? t[1].minus : 0) },
              { type: 'processing', content:  t[0].plus + (t.length > 1 ? t[1].plus : 0) - t[0].minus + (t.length > 1 ? t[1].minus : 0) },
            ],
          c: t[0].plus + (t.length > 1 ? t[1].plus : 0) - t[0].minus + (t.length > 1 ? t[1].minus : 0) > 0 ? '#7fffd44f' : '#e91e6314'
      };
    }

  return listData || {d:[]};

}

const monthCellRender = (value) => {
  const listData = getMonthData(value);
  return (
    <ul className="events"
        style={{ background: listData.c }}
      >
      {listData.d.map((item, idx) => (
        <li key={'id_'+idx}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

const Statistics = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

      <Spin tip="Loading..." spinning={state.statisticsReducer.isProgressListDays} >
        <Calendar dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}
                  loading={true}
                  mode={modeCalendar}
                  onPanelChange={ (m,type) => { modeCalendar = type; fetch(dispatch, type, m) } }
                  onSelect={ (e) => console.log(e) }
        />
      </Spin>

    </Spin>
  </div>

export default connector({methods, component: Statistics});
