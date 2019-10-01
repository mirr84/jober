import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {

  isProgressList: false,
  isProgressAdd: false,
  isProgressUpdate: false,

}

export const categoryReducer = (state = getStorage().getInitStorage('categoryReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'categoryReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
