import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../component/AddAddress'
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import EditAddress from '../component/EditAddress';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.address.addressList)
  const [opneAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const {fetchAddress} = useGlobalContext()


  const handleDisableAddress = async(id) => {
    try {
      const response = await Axios({
        ...summaryApi.disableAddress,
        data: {
          _id: id
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success("Address Remove")
        if (fetchAddress) {
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className=''>
      <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-amber-500 text-amber-500 px-3 py-1 cursor-pointer rounded-2xl hover:bg-amber-200 hover:text-black'>Add more</button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            return (
              <div className={`border rounded p-3 flex gap-3 bg-white cursor-pointer ${!address.status && "hidden"}`}>
                <div className='w-full'>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className='grid gap-10'>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='bg-green-300 p-1 rounded hover:text-white hover:bg-green-600 cursor-pointer'>
                    <AiFillEdit size={22} />
                  </button>
                  <button onClick={() => {
                    handleDisableAddress(address._id)
                  }} className='bg-red-300 p-1 rounded hover:text-white hover:bg-red-600 cursor-pointer'>
                    <MdDeleteForever size={22} />
                  </button>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
          Add address
        </div>
      </div>
      {
        opneAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
      {
        openEdit && (
          <EditAddress data={editData} close={ ()=> setOpenEdit(false)} />
        )
      }
    </div>
  )
}

export default Address