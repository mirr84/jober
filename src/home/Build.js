import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doListBuild} from "../service/buildService";

import {Button, Spin, Card, Icon } from 'antd';

import Menu from './Menu';

const { Meta } = Card;

let listBuild = {};

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Build');

        secure &&
          doCheck({dispatch})
            .then(
              () => doListBuild({dispatch})
                .then(
                  (r) => {
                    listBuild = r;
                    dispatch.setter("buildReducer", {});
                  }
                )
            )

    }
}

const Build = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        <Spin tip="Loading..." spinning={state.buildReducer.isProgressList} >

          <Card>

            {
              listBuild && listBuild.list && listBuild.list.map(
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
