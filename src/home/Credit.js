import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip, InputNumber, Tabs} from 'antd';

import Menu from './Menu';

const { TabPane } = Tabs;

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Credit');

        secure && doCheck({dispatch})
    }
}

const Credit = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

        <Tabs
          hideAdd
          onChange={ (a)=> console.log(a) }
          // activeKey={}
          type="editable-card"
          onEdit={ (a)=> console.log('onEdit ' + a)}
        >
          <TabPane tab={'title1'} key={'key1'}>
            content
          </TabPane>
          <TabPane tab={'title2'} key={'key2'}>
            content
          </TabPane>
        </Tabs>

      <InputNumber
        style={ {width: 150} }
        defaultValue={state.creditReducer.summ}
        formatter={value => `${value}р.`}
        parser={value => value.replace('р.', '')}
        onChange={(summ) => dispatch.setter( 'creditReducer', { summ } )}
      />

        {' '}

      <InputNumber
        defaultValue={state.creditReducer.percent}
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        onChange={(percent)=> dispatch.setter( 'creditReducer', { percent } ) }
      />

        {' '}

      <InputNumber
        defaultValue={state.creditReducer.amounts}
        formatter={value => `${value}`}
        parser={value => value.replace('', '')}
        onChange={(amounts) => dispatch.setter( 'creditReducer', { amounts } )}
      />

        {' '}

      <Button type="primary">Расчет</Button>

      <Divider dashed />

        result

      <Divider dashed />

        график

    </Spin>
  </div>

export default connector({methods, component: Credit});
