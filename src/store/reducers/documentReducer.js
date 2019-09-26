import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {

  isProgressList: false,
  isProgressAdd: false,
  isProgressUpdate: false,
  isProgressAdd: false,
  isProgressDelete: false,

}

export const documentReducer = (state = getStorage().getInitStorage('documentReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'documentReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
