import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        
        setData((preve) => {
            return {
                ...preve, [name] : value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            toast.error(
                "password and confirm password must be same"
            )
            return
        }
        
        try {
            const response = await Axios({
                ...summaryApi.register,
                data: data,
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                navigate("/login");
            }

            console.log("response", response);
        } catch (error) {
            AxiosToastError(error);
        }

    }
    return(
        <section className= 'w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to Binkeyit</p>
              <form className='grid gap-6 mt-6'  onSubmit={handleSubmit}>
                  <div className='grid gap-1'>
                      <label htmlFor="name">Name : </label>
                      <input type="text" autoFocus name="name" value={data.name} id="name" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your name' required />
                  </div>
                  <div className='grid gap-1'>
                      <label htmlFor="email">Email : </label>
                      <input type="email" autoFocus name="email" value={data.email} id="email" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your email' required />
                  </div>
                  <div className='grid gap-1'>
                      <label htmlFor="password">Password : </label>
                      <input type="password" autoFocus name="password" value={data.password} id="password" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your password' required />
                  </div>
                  <div className='grid gap-1'>
                      <label htmlFor="confirmPassword">Confirm Password : </label>
                      <input type="password" autoFocus name="confirmPassword" value={data.confirmPassword} id="confirmPassword" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter confirm password' required />
                  </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold mt-10 my-3 tracking-wide`}>Register</button>
                </form>

                <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default Register