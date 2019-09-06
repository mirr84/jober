import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doListAccount} from "../service/accountService";

import {Button, Spin, Card, Icon } from 'antd';

import Menu from './Menu';

const { Meta } = Card;

let listData = {};

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Account');

        secure &&
          doCheck({dispatch})
            .then(
              () => doListAccount({dispatch})
                .then(
                  (r) => {
                    listData = r;
                    dispatch.setter("accountReducer", {});
                  }
                )
            )

    }
}

const Build = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        <Spin tip="Loading..." spinning={state.accountReducer.isProgressList} >

          <Card>

            {
              listData && listData.list && listData.list.map(
                (r) => <Card.Grid>
                        <Meta title="Europe Street beat"
                              description="www.instagram.com" />
                       </Card.Grid>
              )
            }

          </Card>

        </Spin>

    </Spin>
  </div>

export default connector({methods, component: Build});
