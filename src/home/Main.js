import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button} from 'antd';
import {Spin, Alert} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Main', secure);

        secure && doCheck({dispatch});
    }
}

const Main = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Button size={'small'}
              type="primary"
               icon="question-circle"
               onClick={() => history.push(`/`)}/>

               {' '}

       <Button size={'small'}
               type="primary"
               icon="question-circle"
               onClick={() => history.push(`/main`)}/>

               {' '}

      <Button size={'small'}
              type="primary"
              icon="question-circle"
              onClick={() => history.push(`/111`)}>
              404
      </Button>

    </Spin>
  </div>

export default connector({methods, component: Main});
