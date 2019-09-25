import {combineReducers} from 'redux';

import {commonReducer} from "./commonReducer";
import {authReducer} from "./authReducer";
import {accountReducer} from "./accountReducer";
import {categoryReducer} from "./categoryReducer";
import {documentReducer} from "./documentReducer";
import {statisticsReducer} from "./statisticsReducer";

export default combineReducers(
    {

        commonReducer,
        authReducer,
        accountReducer,
        categoryReducer,
        documentReducer,
        statisticsReducer

    }
);
