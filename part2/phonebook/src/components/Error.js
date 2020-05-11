import React from 'react'
import store from '../reducers/store';

const Error = ({message}) => {
    const errState = store.getState().error;

    if(errState === '') {
        return null;
    }
    

    return (
        <div className='error'>
            {errState}
        </div>
    )
}

export default Error;