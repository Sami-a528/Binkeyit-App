import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const ConfirmDeleteBox = ({ cancel, confirm, close }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/60 p-4 flex justify-center items-center'>
            <div className='bg-white w-full max-w-md p-4 rounded-2xl'>
                <div className='flex justify-between items-center gap-3'>
                    <h1 className='font-semibold'>Parmanent Delete</h1>
                    <button onClick={close} className='cursor-pointer'>
                        <IoIosCloseCircle size={25}/>
                    </button>
                </div>
                <p className='my-4'>Are you sure to delete parmanently ?</p>
                <div className='w-fit ml-auto flex items-center gap-3'>
                    <button onClick={cancel} className='px-4 py-1 border rounded-2xl border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>Cancle</button>
                    <button onClick={confirm} className='px-4 py-1 border rounded-2xl  border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteBox