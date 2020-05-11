/**
 * Reducer
 */
const errorReducer = (state = '', action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'E_SET':
            return action.data;
        default:
            return state;
    }
}

/**
 * Action Creator
 */
export const createErrAction = (err) => {
    return (dispatch) => {
        dispatch(set_action(err));
        setTimeout(() => dispatch(set_action('')), 5000);
    }
}

export const createHTTPErrAction = (err) => {
    return (dispatch) => {
        dispatch(set_action(err.message));
        setTimeout(() => dispatch(set_action('')), 5000);
    }
}

/**
 * Actions
 */

const set_action = (val) => {
    return {
        type: 'E_SET',
        data: val
    }
}

export default errorReducer;