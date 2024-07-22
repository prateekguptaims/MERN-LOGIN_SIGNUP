import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [item,setItem]=useState([])

    const navigate = useNavigate()
    useEffect(() => {

        setLoggedInUser(localStorage.getItem("loggedInUser"))

    }, [])
    const fethProducts = async () => {
        try {
const url="https://mern-login-signup-api.vercel.app/products"
const headers={
    headers:{
        'authorization':localStorage.getItem('token')
    }
}
const response=await fetch(url,headers)
const data=await response.json()
console.log(data)
setItem(data)

        } catch (error) {
console.log(error)
        }
    }
    useEffect(() => {
        fethProducts()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess("User Logout")
        setTimeout(() => {
            navigate('/login')
        }, 1000)

    }
    return (
        <div className='container'>
            <h2>Username is : {loggedInUser}</h2>
            <h2>Products list:</h2>
            {
               item && item?.map((e,index)=>(
                    <div key={index}>
                    <p >{e.name}&nbsp;{e.price}</p>
                    </div>
                ))
            }

            <button onClick={handleLogout} className='logoutbtn'>Logout</button>
            <ToastContainer />
        </div>
    )
}

export default Home
