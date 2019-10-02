import React from 'react';
import ReactDOM from 'react-dom';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducers/index';
import {getStorage} from "./store/storage/getStorage";
import axios from 'axios';
import {LocaleProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import {HashRouter} from 'react-router-dom';

import App from './app/App';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.min.css';
import './index.css';

const store = createStore(reducer);
export default store;
store.subscribe(() => getStorage().storage.setItem('store', JSON.stringify(store.getState())));

axios.interceptors.request.use(
  (config) => {
    config.headers.token = store.getState().authReducer.token;
    return Promise.resolve(config);
  }
);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <LocaleProvider locale={ruRU}>
                <App />
            </LocaleProvider>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
