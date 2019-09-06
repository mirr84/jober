import {combineReducers} from 'redux';

import {commonReducer} from "./commonReducer";
import {authReducer} from "./authReducer";
import {buildReducer} from "./buildReducer";

export default combineReducers(
    {

        commonReducer,
        authReducer,
        buildReducer,

    }
);
