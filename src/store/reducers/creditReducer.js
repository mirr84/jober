import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {

  percent: 13.75,
  summ: 1000000,
  amounts: 120

}

export const creditReducer = (state = getStorage().getInitStorage('creditReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'creditReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
