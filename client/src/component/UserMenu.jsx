import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from "../utils/Axios"
import summaryApi from '../common/summaryApi';
import { logout } from '../store/userSlice';
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logout
            })

            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                nevigate("/");
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }
    return (
        <>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-2'><span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{ user.role === "ADMIN" ? "(Admin)" : ""}</span> </span><Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-amber-500'><FaExternalLinkAlt size={15} /></Link></div>
            <Divider />
            <div className='text-sm grid gap-2'>
                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>Sub Category</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>Upload Product</Link>
                    )  
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>Product</Link>
                    )
                }
                <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>My Orders</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1 rounded-2xl'>Save Address</Link>
                <button onClick={handleLogout} className='text-left text-red-700 px-2 hover:bg-orange-200 py-1 rounded-2xl cursor-pointer'>Log Out</button>
            </div>
        </>
    )
}

export default UserMenu