import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button} from 'antd';
import {Spin} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Home');

        secure && doCheck({dispatch});
    }
}

const Home = ({state, dispatch, history}) =>
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

    </Spin>
  </div>

export default connector({methods, component: Home});
