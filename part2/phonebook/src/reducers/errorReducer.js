/**
 * Reducer
 */
const errorReducer = (state = '', action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'SET':
            return action.data;
        default:
            return state;
    }
}

/**
 * Action Creator
 */
export const setErrAction = (err) => {
    return {
        type: 'SET',
        data: err
    }
}

export default errorReducer;