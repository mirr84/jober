import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doListAccount} from "../service/accountService";

import {Button, Spin, Card, Icon, Table} from 'antd';

import Menu from './Menu';

const { Meta } = Card;

let listData = {};
let pagination = {};

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Account');

        listData = {};
        dispatch.setter("accountReducer", {});
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

const fetch = (dispatch, params = {}) => {
    console.log('params:', params);

    doListAccount({dispatch, params})
      .then(
        (data) => {
          listData = data;
          pagination = { ...pagination };
          pagination.total = data.total_count;

          dispatch.setter("accountReducer", {});
        }
      )

};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const handleTableChange = (dispatch, pagination, filters, sorter) => {

  const pager = { ...pagination };
  pager.current = pagination.current;
  pagination = pager;

  fetch(dispatch, {
    results: pagination.pageSize,
    page: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });

};

const Build = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

          {
            JSON.stringify( listData )
          }

        <Table
          columns={columns}
          rowKey={record => record}
          dataSource={listData.list}
          pagination={pagination}
          loading={state.accountReducer.isProgressList}
          onChange={(pagination, filters, sorter) => handleTableChange(dispatch, pagination, filters, sorter)}
        />

    </Spin>
  </div>

export default connector({methods, component: Build});
