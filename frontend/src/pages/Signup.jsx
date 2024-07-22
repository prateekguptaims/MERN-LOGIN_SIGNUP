import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        const copyLoginInfo = { ...signupInfo }
        copyLoginInfo[name] = value;
        setSignupInfo(copyLoginInfo)
    }
    // console.log(loginInfo)

    const handleSignup =async (e) => {
        e.preventDefault()
        const {name,email,password}=signupInfo

        if(!name || !email || !password)
        {
            return handleError('All fields are required')
        }
        try {
            const url="https://mern-login-signup-api.vercel.app/auth/signup"
            const response= await fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            })
            const result= await response.json()
            console.log(result)
            const {success, message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
            else if(error){
                const details= error.details[0].message
                handleError(details)
            }
            else if(!success){
                handleError(message)
            }


        } catch (error) {
            handleError(error)
        }


    }
    return (
        <div className='container'>
            <h1>Signup</h1>

            <form action="" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="" autoFocus placeholder='enter your name' value={signupInfo.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='enter your email' value={signupInfo.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="name">Password</label>
                    <input type="text" name="password" id="" placeholder='enter your password' value={signupInfo.password} onChange={handleChange} />
                </div>
                <button type='submit' className='signuptbtn'>Signup</button>
                <span>Already an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>



            <ToastContainer />

        </div>
    )
}

export default Signup
