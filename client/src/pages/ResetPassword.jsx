import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import summaryApi from '../common/summaryApi.js'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const valideValue = Object.values(data).every(el => el)

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email,
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve, [name]: value
            }
        })
    }

    console.log("data reset password", data);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Password dose not Match");
            return;
        }

        try {
            const response = await Axios({
                ...summaryApi.resetPassword,
                data: data,
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: "",
                })
            }

        } catch (error) {
            AxiosToastError(error);
        }

    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-bold text-lg mb-3'>Enter Your Password</p>
                <form className='grid gap-6 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="newPassword">New Password : </label>
                        <input type="password" autoFocus name="newPassword" value={data.newPassword} id="newPassword" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter your password' />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="confirmPassword">Confirm Password : </label>
                        <input type="password" autoFocus name="confirmPassword" value={data.confirmPassword} id="confirmPassword" onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-amber-400' placeholder='Enter confirm password' />
                    </div>
                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold mt-4 my-3 tracking-wide`}>Change Password</button>
                </form>

                <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default ResetPassword