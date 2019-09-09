import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doListAccount} from "../service/accountService";

import {Button, Spin, Card, Icon, Table, Tooltip, Divider} from 'antd';

import Menu from './Menu';

const { Meta } = Card;

let listData = {};
let pagination = { pageSize: 20 };

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Account');

        listData = {};
        dispatch.setter("accountReducer", {});
        secure &&
          doCheck({dispatch})
            .then(
              () => fetch(dispatch)
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
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: true,
    filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
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

        <Tooltip title={'category'} placement="bottomLeft">
            <Button size={'small'}
                     type="primary"
                     icon="plus"
                     onClick={() => history.push(`/account/create`)}/>
        </Tooltip>

        <Divider dashed />

        <Table
          size="small"
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
