import React from 'react'
import UserMenu from '../component/UserMenu'
import { IoIosCloseCircle } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
      <button onClick={()=> window.history.back()} className='text-neutral-800 block w-fit ml-auto px-3'>
        <IoIosCloseCircle size={27}/>
      </button>
      <div className='container mx-auto px-3 pb-8'>
        <UserMenu />
      </div>
    </section>
  )
}

export default UserMenuMobile