import React, { useState } from 'react';
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
    const [ visible, setVisible ] = useState(false);

    //inline css
    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    )
}

export default Togglable;