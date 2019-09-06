import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../storage/getStorage";

const initState = {
}

export const buildReducer = (state = getStorage().getInitStorage('buildReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'buildReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
