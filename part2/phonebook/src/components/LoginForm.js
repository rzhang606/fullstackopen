import React, {useState} from 'react'
import FormField from './FormField'

const LoginForm = ({login}) => {
    const [ username, setUsername ] = useState(''); // form input username
    const [ password, setPassword ] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in for', username, password);

        login({
            username: username,
            password: password
        });

        setUsername('');
        setPassword('');
    }

    return (
        <form onSubmit={handleLogin}>
            <FormField title={'Username'} input={username} inputHandler={handleUsernameChange}/>
            <FormField title={'Password'} input={password} inputHandler={handlePasswordChange}/>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm