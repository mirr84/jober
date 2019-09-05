import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Layout} from 'antd';

import MyProgressModal from './MyProgressModal';
import MyLoginModal from './MyLoginModal';

const {Header, Content, Footer} = Layout;

let isCheckSecure = false;

const methods = {
    componentWillMount({state, dispatch, secure = false}) {
        console.log('init Layout');

        if (secure) {
          isCheckSecure = true;
          dispatch.setter("commonReducer", {});

          doCheck({dispatch})
            .then(
              () => {
                // успех проверки авторизации
                dispatch.setter("authReducer", { isAuth: true });
              },
              () => {
                // ошибка проверка авторизации
                dispatch.setter("authReducer", { isAuth: false });
              }
            )
            .then (
              () => {
                isCheckSecure = false;
                dispatch.setter("commonReducer", {});
              }
            )

        }

    }
}

const MyLayout = ({state, dispatch, content: ContentComponent, secure = false, isHeader = true, isFooter = true}) =>
  <div>

    <MyProgressModal visible={isCheckSecure} />
    <MyLoginModal visible={!state.authReducer.isAuth} />

  {
    !isCheckSecure && state.authReducer.isAuth &&
      <Layout className="layout">

        {
          isHeader &&
          <Header style= {{ background: '#fff', margin: 20, marginBottom: 0 }}>
              <div>
                Header
              </div>
          </Header>
        }

        <Content style={{ padding: 20, minHeight: `calc(100vh - ${isHeader ? 84: 0}px - ${isFooter ? 89: 0}px )` }}>
          <div style={{ background: '#fff', padding: 24 }}>
              <ContentComponent secure={secure} />
          </div>
        </Content>

        {
          isFooter &&
          <Footer style= {{ background: '#fff', margin: 20, marginTop: 0 }}>
            <div>
              Footer
              </div>
          </Footer>
        }

      </Layout>
  }

  </div>

export default connector({methods, component: MyLayout});
