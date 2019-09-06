import React from 'react';

import {connector} from "./../store/connectors";
import {doLogin} from "../service/authService";

import {Modal, Input, Tooltip, Icon, Button} from 'antd';

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init MyLoginModal');

         dispatch.setter( 'authReducer', {password: ''} )
    }
}

const MyLoginModal = ({state, dispatch, visible = false}) =>
<Modal
        centered
        visible={visible}
        closable={false}
        footer={null}
      >

      <Input
          placeholder="login"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title="Extra information">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          defaultValue={state.authReducer.login}
          onChange={ ({target: {value: login}}) => dispatch.setter( 'authReducer', {login} ) }
        />

      <Input.Password
          placeholder="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          defaultValue={state.authReducer.password}
          onChange={ ({target: {value: password}}) => dispatch.setter( 'authReducer', {password} ) }
        />

      <br  />
      <br  />

      <Button type="primary"
              disabled={ !state.authReducer.login || !state.authReducer.password }
              onClick={ () => doLogin({dispatch, ...state.authReducer}) }
      >Войти</Button>

</Modal>

export default connector({methods, component: MyLoginModal});
