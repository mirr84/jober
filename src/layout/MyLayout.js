import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck, doLogout} from "../service/authService";

import {Layout, Button,  Popconfirm, PageHeader, Menu, Dropdown, Icon, Tag, Typography, Row, Tooltip} from 'antd';

import MyProgressModal from './MyProgressModal';
import MyLoginModal from './MyLoginModal';

import menuParams from './menuParams.json';

const {Header, Content, Footer} = Layout;
const { Paragraph } = Typography;

let isCheckSecure = false;

const methods = {
    componentWillMount({state, dispatch, secure = false}) {
        console.log('init Layout');

        if (secure) {
          isCheckSecure = true;
          dispatch.setter("commonReducer", {});

          doCheck({dispatch})
            .then(
              () => {},
              () => {}
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

const MyLayout = (
  {
      state, dispatch, history,
      content: ContentComponent, secure = false, isHeader = true, isFooter = true
  }
) =>
  <div>

    <MyProgressModal visible={isCheckSecure} />
    <MyLoginModal visible={!state.authReducer.isAuth} />

  {
    !isCheckSecure && state.authReducer.isAuth &&
      <Layout className="layout">

        {
          isHeader &&
          <Header style= {{ background: '#fff', margin: 20, marginBottom: 0, height: 57 }}>
              <div>
                         <PageHeader
                           title="Контроль расходов"
                           subTitle={ menuParams.find( a => history.location.pathname.match(new RegExp(a.pathname))  ).title }
                           extra={[
                             <Tooltip title={'profile'} placement="bottomLeft">
                               <Button size="small" type="dashed"
                                       icon="user"
                                       onClick={ ()=> history.push(`/profile`) }
                               > { state.authReducer.login } </Button>
                             </Tooltip>,
                             <Popconfirm key={'PopconfirmExit'} placement="topLeft"
                                         title={'Выйти?'} onConfirm={ () => doLogout({dispatch}) } okText="Yes" cancelText="No">
                                <Tooltip title={'exit'} placement="bottomLeft">
                                  <Button size={'small'}
                                          type="primary"
                                          icon="logout"/>
                                </Tooltip>
                             </Popconfirm>
                           ]}
                         >
                         </PageHeader>
              </div>
          </Header>
        }

        <Content style={{ padding: 20, minHeight: `calc(100vh - ${isHeader ? 77: 0}px - ${isFooter ? 89: 0}px )` }}>
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
