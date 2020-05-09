import React from 'react'
import FormField from './FormField'

const LoginForm = ({handlerLogin, username, password, setUsername, setPassword}) => {
    return (
        <form onSubmit={handlerLogin}>
            <FormField title={'Username'} input={username} inputHandler={setUsername}/>
            <FormField title={'Password'} input={password} inputHandler={setPassword}/>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm