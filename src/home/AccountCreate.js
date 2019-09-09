import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Spin, Steps, Button, message} from 'antd';

import Menu from './Menu';

const { Step } = Steps;

let current = 0;

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init AccountCreate');

        current = 0;
        secure && doCheck({dispatch})
    }
}

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const next = ({dispatch}) => {
  current = current + 1;
  dispatch.setter("accountReducer", {});
}

const prev = ({dispatch}) => {
  current = current - 1;
  dispatch.setter("accountReducer", {});
}


const AccountCreate = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        AccountCreate

        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button size="small" type="primary" onClick={() => next({dispatch})}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button size="small" type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button size="small" style={{ marginLeft: 8 }} onClick={() => prev({dispatch})}>
              Previous
            </Button>
          )}
        </div>

    </Spin>
  </div>

export default connector({methods, component: AccountCreate});
