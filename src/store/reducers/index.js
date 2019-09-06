import {combineReducers} from 'redux';

import {commonReducer} from "./commonReducer";
import {authReducer} from "./authReducer";
import {accountReducer} from "./accountReducer";

export default combineReducers(
    {

        commonReducer,
        authReducer,
        accountReducer,

    }
);
