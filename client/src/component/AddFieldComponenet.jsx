import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const AddFieldComponenet = ({close, value, onChange, submit}) => {
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded-2xl p-4 w-full max-w-md'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add fields</h1>
                    <button onClick={close} className='cursor-pointer'>
                        <IoIosCloseCircle size={25}/>
                    </button>
                </div>
                <input type="text" className='bg-blue-50 p-2 my-4 border outline-none focus-within:border-amber-300 rounded-2xl w-full' placeholder='Enter field name' value={value} onChange={onChange} />
                <button onClick={submit} className='bg-amber-300 cursor-pointer hover:bg-amber-500 px-4 py-2 rounded-2xl mx-auto w-fit block mt-3'>
                    Add field
                </button>
            </div>
        </section>
    )
}

export default AddFieldComponenet