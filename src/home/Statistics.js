import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin} from 'antd';

import {doListDaysStatistics} from "../service/statisticsService";

import Menu from './Menu';

let modeCalendar = 'month';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Statistics');

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
        console.log(d)
      }
    )

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'default', content: 'переводы' },
        { type: 'success', content: 'доход' },
        { type: 'error', content: 'расход' },
        { type: 'processing', content: 'баланс' },
      ];
      break;
    default:
  }
  return listData || [];
}

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
}

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
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
