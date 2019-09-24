import React from 'react';

import moment from 'moment';
import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {doListDocument, doUpdateDocument, doAddDocument} from "../service/documentService";
import {doListAccount} from "../service/accountService";
import {doListCategoty} from "../service/categoryService";

import {Button, Tabs, Spin, Divider, Tag, Icon, Switch, Table, Input, Select, DatePicker, InputNumber, Row, Col} from 'antd';

import Menu from './Menu';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

let defaultActiveKey;
let pagination = { current: 1, pageSize: 100, position: 'both' };
let pagination_, filters_, sorter_;

let listDocumentData = [];
let listAccountData = [];
let listCategotyData = [];

const methods = {
    componentWillMount({state, dispatch, secure, history}) {
        let [,p1,p2] = history.location.pathname.split('/')
        defaultActiveKey = p2 ? p2 : 'income';

        secure && doCheck({dispatch})
          .then(
            () => {
              fetch(dispatch);

              doListAccount({dispatch, params: {results: -1}})
                .then(
                  (data) => {
                    listAccountData = data.list;
                    dispatch.setter("documentReducer", {});
                  }
                )

              doListCategoty({dispatch, params: {results: -1}})
                .then(
                  (data) => {
                    listCategotyData = data.list;
                    dispatch.setter("documentReducer", {});
                  }
                )

            }
          );
    }
}

const fetch = (dispatch, params = {}) => {

    doListDocument({dispatch, params})
      .then(
        (data) => {
          listDocumentData = data;
          pagination = pagination_ = { ...pagination };
          pagination.total = data.total_count;
          dispatch.setter("documentReducer", {});
        }
      )

};

const columns = ({dispatch}) => [
  {
    title: 'id',
    dataIndex: 'id',
    render: id => `${id}`,
    width: 50
  },
  {
    title: 'key',
    dataIndex: 'key'
  },
  {
    title: 'description',
    dataIndex: 'description',
    render: (text, record) => text
  },
  {
    title: 'category',
    dataIndex: 'category'
  },
  {
    title: 'direct',
    dataIndex: 'direct'
  },
  {
    title: 'datetime',
    dataIndex: 'datetime',
    sorter: true,
  },
  {
    title: 'summ',
    dataIndex: 'summ',
    sorter: true,
  },
  {
    title: 'deleted',
    dataIndex: 'deleted'
  },
];

const handleTableChange = (dispatch, pagination = pagination_, filters = filters_, sorter = sorter_) => {

  pagination_ = pagination;
  filters_ = filters;
  sorter_ = sorter;

  const pager = { ...pagination };
  pager.current = pagination.current;
  pagination = pager;

  fetch(dispatch, {
    results: pagination.pageSize,
    page: pagination.current,
    sortField: sorter ? sorter.field : null,
    sortOrder: sorter ? sorter.order : null,
    ...filters,
  });

};

const DocumentCreatePanel = (
  {
   isKeyFrom = false, isCategotyFrom = false,
   isKeyTo = false, isCategotyTo = false,
   isCategotyAny = false,
   change,
   state, dispatch
  }
) =>

<div>
  <Row  gutter={16}>

    {
      isKeyFrom &&
        <Col span={4}>
          <Select style={{ width: '100%' }}
                  loading={state.accountReducer.isProgressList}
                  value={state.documentReducer.keyFrom}
                  onChange={(keyFrom)=> dispatch.setter( 'documentReducer', { keyFrom } ) }
                  placeholder="isKeyFrom"
            >
            {
              listAccountData.map(
                (a) => <Option value={a.key}>{a.key} ({a.description})</Option>
              )
            }
          </Select>
        </Col>
    }

    {
      isCategotyFrom &&
        <Col span={4}>
          <Select style={{ width: '100%' }}
                        loading={state.accountReducer.isProgressList}
                        value={state.documentReducer.categotyFrom}
                        onChange={(categotyFrom)=> dispatch.setter( 'documentReducer', { categotyFrom } ) }
                        placeholder="isCategotyFrom"
                  >
                  {
                    listCategotyData
                      .filter((a) => a.expenditure === 1)
                      .map(
                        (a) => <Option value={a.id}>{a.description}</Option>
                      )
                  }
          </Select>
        </Col>
    }

    {
      isCategotyAny &&
        <Col span={4}>
          <Select style={{ width: '100%' }}
                    loading={state.accountReducer.isProgressList}
                    value={state.documentReducer.categotyAny}
                    onChange={(categotyAny)=> dispatch.setter( 'documentReducer', { categotyAny } ) }
                    placeholder="isCategotyAny"
              >
              {
                    listCategotyData.map(
                      (a) => <Option value={a.id}>{a.description}</Option>
                    )
              }
          </Select>
        </Col>
    }

    {
      isKeyTo &&
        <Col span={4}>
          <Select style={{ width: '100%' }}
                  loading={state.accountReducer.isProgressList}
                  value={state.documentReducer.keyTo}
                  onChange={(keyTo)=> dispatch.setter( 'documentReducer', { keyTo } ) }
                  placeholder="isKeyTo"
            >
            {
              listAccountData.map(
                (a) => <Option value={a.key}>{a.key} ({a.description})</Option>
              )
            }
          </Select>
        </Col>
    }

    {
      isCategotyTo &&
        <Col span={4}>
          <Select style={{ width: '100%' }}
                  loading={state.accountReducer.isProgressList}
                  value={state.documentReducer.categotyTo}
                  onChange={(categotyTo)=> dispatch.setter( 'documentReducer', { categotyTo } ) }
                  placeholder="isCategotyTo"
            >
            {
                  listCategotyData
                    .filter((a) => a.income === 1)
                    .map(
                      (a) => <Option value={a.id}>{a.description}</Option>
                    )
            }
          </Select>
        </Col>
    }

    <Col span={4}>
      <DatePicker
        format={"DD.MM.YYYY HH:mm:ss"}
        style={{ width: '100%' }}
        showTime={true}
        value={
          (() => {
            let d = moment(state.documentReducer.dateDocument, 'DD.MM.YYYY HH:mm:ss');
            if (d.isValid()) {
              return d;
            } else {
              dispatch.setter( 'documentReducer', { dateDocument: moment().format('DD.MM.YYYY HH:mm:ss') } )
              return moment();
            }
          })()
        }
        onChange={(a)=> dispatch.setter( 'documentReducer', { dateDocument: a && a.format('DD.MM.YYYY HH:mm:ss') } ) }
      />
    </Col>

    <Col span={4}>
      <InputNumber min={0} max={10000000} step={0.01}
                 style={{ width: '100%' }}
                 value={state.documentReducer.summ}
                 onChange={(summ)=> dispatch.setter( 'documentReducer', { summ: parseFloat(summ || 0) } ) }
                 placeholder="summ"
      />
    </Col>

    <Col span={4}>
      <Button onClick = {change}>
        Создать
      </Button>
    </Col>

  </Row>

  <Row>
    <Col><br /></Col>
  </Row>

  <Row gutter={16}>
    <Col>
      <TextArea
        style={{ width: '100%' }}
        placeholder="Autosize height with minimum and maximum number of lines"
        value={state.documentReducer.description}
         onChange={({target: {value: description}})=> dispatch.setter( 'documentReducer', { description } ) }
        autosize={{ minRows: 2, maxRows: 6 }}
      />
    </Col>
  </Row>
</div>

const Document = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        <Tabs defaultActiveKey={defaultActiveKey} onChange={ (key) => history.push(`/document/${key}`) }>
          <TabPane tab="Доход" key="income">

              <DocumentCreatePanel
                  state = {state}
                  dispatch={dispatch}
                  isKeyTo = {true} isCategotyTo = {true}
                  change = {() =>
                    doAddDocument({dispatch, params: { direct: 1, ...state.documentReducer }})
                      .then(
                        () => handleTableChange(dispatch)
                      )
                  }
              />

          </TabPane>
          <TabPane tab="Расход" key="expenditure">

            <DocumentCreatePanel
                state = {state}
                dispatch={dispatch}
                isKeyFrom = {true} isCategotyFrom = {true}
                change = {() =>
                  doAddDocument({dispatch, params: { direct: -1, ...state.documentReducer }})
                    .then(
                      () => handleTableChange(dispatch)
                    )
                }
            />

          </TabPane>
          <TabPane tab="Перевод" key="transaction">

            <DocumentCreatePanel
                state = {state}
                dispatch={dispatch}
                isKeyFrom = {true}
                isKeyTo = {true}
                isCategotyAny = {true}
                change = {() =>
                  doAddDocument({dispatch, params: { direct: 0, ...state.documentReducer }})
                    .then(
                      () => handleTableChange(dispatch)
                    )
                }
            />

          </TabPane>
        </Tabs>

        <Divider dashed />

          <Table
            size="small"
            columns={columns({dispatch})}
            rowKey={record => record.id}
            rowClassName={
              (record, index) => {
                if (record.groupKeys) { return 'netral-row'; }
                if (record.direct === -1) { return 'bad-row'; }
                if (record.direct === 1) { return 'good-row'; }
              }
            }
            dataSource={listDocumentData.list}
            pagination={pagination}
            loading={state.documentReducer.isProgressList}
            onChange={(pagination, filters, sorter) => handleTableChange(dispatch, pagination, filters, sorter)}
          />

    </Spin>
  </div>

export default connector({methods, component: Document});
