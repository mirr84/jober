import React from 'react';

import {connector} from "./../store/connectors";
import {doLogin, doRegistration} from "../service/authService";

import {Modal, Input, Tooltip, Icon, Button, Tabs, Spin} from 'antd';

const { TabPane } = Tabs;

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init MyLoginModal');

         dispatch.setter( 'authReducer', {password: ''} )
    }
}

const changeTabs = (key) => {
  console.log(key);
}


const MyLoginModal = ({state, dispatch, visible = false}) =>
<Modal
        centered
        visible={visible}
        closable={false}
        footer={null}
      >

      <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck || state.authReducer.isProgressLogin || state.authReducer.isProgressReg} >

        <Tabs defaultActiveKey="1" onChange={changeTabs}>
          <TabPane tab="Авторизация" key="auth">
            <Input
                placeholder="login"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                value={state.authReducer.login}
                onChange={ ({target: {value: login}}) => dispatch.setter( 'authReducer', {login} ) }
              />

            <Input.Password
                placeholder="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={state.authReducer.password}
                onChange={ ({target: {value: password}}) => dispatch.setter( 'authReducer', {password} ) }
              />

            <br  />
            <br  />

            <Button type="primary"
                    disabled={ !state.authReducer.login || !state.authReducer.password }
                    onClick={ () => doLogin({dispatch, ...state.authReducer}) }
            >
            Войти
            </Button>
          </TabPane>
          <TabPane tab="Регистрация" key="reg">
            <Input
                placeholder="login"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                value={state.authReducer.login}
                onChange={ ({target: {value: login}}) => dispatch.setter( 'authReducer', {login} ) }
              />
            <Input
                  placeholder="email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Extra information">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                  value={state.authReducer.email}
                  onChange={ ({target: {value: email}}) => dispatch.setter( 'authReducer', {email} ) }
              />
            <Input.Password
                placeholder="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={state.authReducer.password}
                onChange={ ({target: {value: password}}) => dispatch.setter( 'authReducer', {password} ) }
              />

            <br  />
            <br  />

            <Button type="primary"
                    disabled={ !state.authReducer.login || !state.authReducer.email || !state.authReducer.password }
                    onClick={ () => doRegistration({dispatch, ...state.authReducer}) }
            >
            Регистрация
            </Button>
          </TabPane>
        </Tabs>

      </Spin>

</Modal>

export default connector({methods, component: MyLoginModal});
