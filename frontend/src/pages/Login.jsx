import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
       
        email: '',
        password: ''
    })
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
       // console.log(name, value)
        const copyLoginInfo = { ...loginInfo }
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
    // console.log(loginInfo)
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `https://mern-login-signup-api.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>

            <form action="" onSubmit={handleLogin}>
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='enter your email' value={loginInfo.email} onChange={handleChange} autoComplete='off'/>
                </div>
                <div>
                    <label htmlFor="name">Password</label>
                    <input type="password" name="password" id="" placeholder='enter your password' value={loginInfo.password} onChange={handleChange} autoComplete='off'/>
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>



            <ToastContainer />

        </div>
    )
}

export default Login
