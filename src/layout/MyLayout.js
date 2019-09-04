import React from 'react';

import {connector} from "./../store/connectors";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Layout');

    }
}

let isHeader = true;
let isFooter = true;

const MyLayout = ({state, dispatch, content: Component}) =>
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
      <Component />
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

export default connector({methods, component: MyLayout});
