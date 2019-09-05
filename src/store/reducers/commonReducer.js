import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {
}

export const commonReducer = (state = getStorage().getInitStorage('commonReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'commonReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
