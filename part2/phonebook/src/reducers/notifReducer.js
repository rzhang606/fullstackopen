/**
 * Reducer
 */
const notifReducer = (state='', action) => {
    switch(action.type) {
        case 'N_SET':
            return action.data;
        default:
            return state;
    }    
}

/**
 * Action Creator
 */
export const createNotif = (message) => {
    return (dispatch) => {
        dispatch(set_action(message));
        setTimeout(() => dispatch(set_action('')), 5000);
    }
}

 /**
  * Action
  */
 const set_action = (val) => {
     return {
         type: 'N_SET',
         data: val
     }
 }

  export default notifReducer;