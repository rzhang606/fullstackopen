import React from 'react'
import { Form } from 'react-bootstrap'

const FormField = ({title, input, inputHandler}) => {
    return (
        <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Control
                type='text'
                value={input}
                onChange={inputHandler}
            />
        </Form.Group>
    )
}

export default FormField