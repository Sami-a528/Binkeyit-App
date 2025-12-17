import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useNavigate } from 'react-router-dom'
import fetchUserDetails from "../utils/fetchUserDetails.js"
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve, [name]: value
      }
    })
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...summaryApi.login,
        data: data,
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken)
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate("/");
      }

      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }

  }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <form className='grid gap-6 py-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="email">Email : </label>
            <input type="email" autoFocus name="email" value={data.email} id="email" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your email' />
          </div>
          <div className='grid gap-1'>
            <label htmlFor="password">Password : </label>
            <input type="password" autoFocus name="password" value={data.password} id="password" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your password' />
          </div>
          <Link to={"/forgot-password"} className='block ml-auto mt-4 hover:text-amber-400'>Forgot password ?</Link>
          <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold mt-4 my-3 tracking-wide cursor-pointer`}>Login</button>
        </form>

        <p>Don't have account ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
      </div>
    </section>
  )
}

export default Login