import React, {useState} from 'react'
import loginService from '../services/login'

const Loginform = ({setUser, showNotification}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({'username': username, 'password': password})
            window.localStorage.setItem('blogUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            showNotification('Invalid username or password', 'fail')
        }
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    Password
                    <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Loginform