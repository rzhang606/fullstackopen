import React from 'react';
import store from '../reducers/store';


const Notification = () => {
    const message = store.getState().notification;
    if(message === '') {
        return null;
    }

    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notification;