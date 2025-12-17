import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserAlt } from "react-icons/fa";
import UserProfileAvatarEdit from '../component/UserProfileAvatarEdit';
import Axios from "../utils/Axios"
import summaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector(state => state.user);
    const [openProfileAvatarEdit, setProfileAvataEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUserData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.updateUserDetails,
                data: userData,
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error);

        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            {/* Profile upload and display image */}
            <div className='w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img src={user.avatar} alt={user.name} className='w-full h-full' />
                    ) : (
                        <FaUserAlt size={65} />
                    )
                }
            </div>
            <button onClick={() => setProfileAvataEdit(true)} className='text-sm min-w-20 border px-3 py-1 rounded-full mt-3 border-amber-300 hover:border-amber-600 hover:bg-amber-400'>Edit</button>
            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setProfileAvataEdit(false)} />
                )
            }

            {/* name, mobile, email, change password */}
            <form className='my-4 grid gap-5' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name</label>
                    <input type="text" placeholder='Enter your name' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-300 rounded-2xl' value={userData.name} name='name' onChange={handleOnChange} required />
                </div>
                <div className='grid'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id='email' placeholder='Enter your email' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-300 rounded-2xl' value={userData.email} name='email' onChange={handleOnChange} required />
                </div>
                <div className='grid'>
                    <label htmlFor='text'>Mobile</label>
                    <input type="number" id='mobile' placeholder='Enter your mobile' className='p-2 bg-blue-50 outline-none border focus-within:border-amber-300 rounded-2xl' value={userData.mobile} name='mobile' onChange={handleOnChange} required />
                </div>
                <button className='border px-4 py-2 font-semibold hover:bg-amber-300 border-amber-300 text-amber-300 hover:text-neutral-800 rounded-2xl'>
                    {
                        loading ? "Loading..." : "Submit"
                    }
                </button>
            </form>

        </div>
    )
}

export default Profile