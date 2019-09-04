import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Layout, Spin, Icon, Modal} from 'antd';

const {Header, Content, Footer} = Layout;

let isHeader = true;
let isFooter = true;
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

const MyLayout = ({state, dispatch, content: ContentComponent, secure = false}) =>
  <div>

    <Modal
            centered
            visible={isCheckSecure}
            closable={false}
            footer={null}
            zIndex={10000}
            width={'auto'}
          >
            <Spin indicator={<Icon type="loading" style={{fontSize: 100}} spin/>}/>
    </Modal>

  {
    !isCheckSecure &&
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
