import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {

  isProgressListDays: false,

}

export const statisticsReducer = (state = getStorage().getInitStorage('statisticsReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'statisticsReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
