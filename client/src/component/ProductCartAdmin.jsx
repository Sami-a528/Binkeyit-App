import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import { IoIosCloseCircle } from 'react-icons/io'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const ProductCartAdmin = ({ data, fetchProductData }) => {
    const [editOpen, setEditOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const handleDeleteCancle = ()=>{
        setOpenDelete(false)
    }

    const handleDelete = async() => {
        try {
            const response = await Axios({
                ...summaryApi.deleteProductDetails,
                data: {
                    _id: data._id,
                }
            })

            const {data: responseData} = response
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchProductData) {
                    fetchProductData()
                }
                setOpenDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className='w-36 p-4 bg-white rounded'>
            <div>
                <img src={data?.image[0]} alt={data?.name} className='w-full h-full object-scale-down' />
            </div>
            <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
            <p className='text-slate-500'>{data?.unit}</p>
            <div className='grid grid-cols-2 gap-3 py-2'>
                <button onClick={()=> setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-500 cursor-pointer rounded-full'>Edit</button>
                <button onClick={()=> setOpenDelete(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-500 cursor-pointer rounded-full'>Delete</button>
            </div>

            {
                editOpen && (
                    <EditProductAdmin fetchProductData={fetchProductData} data={data} close={ ()=> setEditOpen(false) } />
                )
            }

            {
                openDelete && (
                    <section className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800/60 p-4 flex justify-center items-center'>
                        <div className='bg-white p-4 w-full max-w-md rounded-2xl'>
                            <div className='flex items-center justify-between gap-4'>
                                <h2 className='font-semibold'>Permanent Delete</h2>
                                <button onClick={()=> setOpenDelete(false)} className='cursor-pointer'>
                                    <IoIosCloseCircle size={25}/>
                                </button>
                            </div>
                            <p className='my-2'>Are you sure want to delete permanent ?</p>
                            <div className='flex justify-end gap-5 py-4'>
                                <button onClick={handleDeleteCancle} className='border px-3 py-1 rounded-full bg-red-200 border-red-500 text-red-500 hover:bg-red-300 cursor-pointer'>Cancel</button>
                                <button onClick={handleDelete} className='border px-3 py-1 rounded-full  bg-green-300 border-green-500 text-green-700 hover:bg-green-600 cursor-pointer'>Delete</button>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>

    )
}

export default ProductCartAdmin