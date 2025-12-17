import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const ViewImage = ({ url, close }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/60 z-50 flex justify-center items-center p-4'>
            <div className='w-full max-w-md max-h-[80vh] p-4 bg-white'>
                <button onClick={close} className='cursor-pointer w-fit ml-auto block'>
                    <IoIosCloseCircle size={25} />
                </button>
                <img src={url} alt="View in full Screen " className='w-full h-full object-scale-down'/>
            </div>
        </div>
    )
}

export default ViewImage