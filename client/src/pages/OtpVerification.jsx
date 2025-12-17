import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location", location);

    useEffect(() => {
        if (!location?.state?.email)
            navigate("/forgot-password")
    }, [])

    const valideValue = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...summaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email,
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                });
            }
        } catch (error) {
            AxiosToastError(error);
        }

    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-bold text-lg mb-3'>Enter OTP</p>
                <form className='grid gap-6 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="otp">Enter Your OTP : </label>
                        <div className='flex items-center gap-2 mt-5 justify-between'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input key={"otp" + index} type="text" autoFocus id="otp" ref={(ref) => {
                                            inputRef.current[index] = ref
                                            return ref
                                        }} value={data[index]} onChange={(e) => {
                                            const value = e.target.value
                                            console.log("Value", value);

                                            const newData = [...data]
                                            newData[index] = value

                                            setData(newData)

                                            if (value && index < 5) {
                                                inputRef.current[index + 1].focus()
                                            }
                                        }} maxLength={1} className='bg-blue-50 w-full max-w-18 text-center font-semibold p-2 border rounded outline-none focus:border-amber-400' />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold mt-4 my-3 tracking-wide`}>Verify OTP</button>
                </form>

                <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default OtpVerification