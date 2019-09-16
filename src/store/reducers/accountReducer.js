import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {

  isProgressList: false,
  isProgressAdd: false,

}

export const accountReducer = (state = getStorage().getInitStorage('accountReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'accountReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
