import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    });

    const navigate = useNavigate()

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
                ...summaryApi.forgot_password,
                data: data,
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/verification-otp", {
                    state: data,
                })
                setData({
                    email: "",
                })
            }

            console.log("response", response);
        } catch (error) {
            AxiosToastError(error);
        }

    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-bold text-lg mb-3'>Forgot Password</p>
                <form className='grid gap-6 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email : </label>
                        <input type="email" autoFocus name="email" value={data.email} id="email" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your email' />
                    </div>
                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold mt-4 my-3 tracking-wide`}>Send Otp</button>
                </form>

                <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default ForgotPassword