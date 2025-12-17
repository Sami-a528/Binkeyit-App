import React, { useEffect, useState } from 'react'
import logo from "../assets/logo (1).png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { displayPriceinRupees } from '../utils/displayPriceinRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import CartItemDisplay from './CartItemDisplay';


const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector(state => state.cartItem.cart);
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [totalQty, setTotalQty] = useState(0)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)


  const redirectToLoginPage = () => {
    navigate("/login");
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }
  const handleMobileUsers = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  }

  // // total items and total price
  // useEffect(() => {
  //   const qty = cartItem.reduce((preve, curr) => {
  //     return preve + curr.quantity
  //   }, 0)
  //   setTotalQty(qty)
    
  //   const tPrice = cartItem.reduce((preve, curr) => {
  //     return preve + (curr.productId.price * curr.quantity)
  //   }, 0)
  //   setTotalPrice(tPrice)
  // }, [cartItem])

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
            {/** logo */}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>
                <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block' />
                <img src={logo} alt="logo" width={120} height={60} className='lg:hidden' />
              </Link>
            </div>
            {/** Search */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/** Login and my cart */}
            <div>
              {/* user icon display only in mobile version */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUsers}>
                <FaRegCircleUser size={26} />
              </button>
              {/* Desktop */}
              <div className='hidden lg:flex items-center gap-10'>
                {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-2 cursor-pointer'>
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={25}/>
                          ): (
                            <GoTriangleDown size = { 25 }/>
                          )
                        }
                      </div>
                      {
                        openUserMenu && (
                          <div className='absolute right-0 top-13'>
                            <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                              <UserMenu close={ handleCloseUserMenu } />
                            </div>
                          </div>
                        )
                      }
                    </div>
                  ) : (
                    <button onClick={redirectToLoginPage} className='text-lg px-3 cursor-pointer'>Login</button>
                  )
                }
                <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-600 px-3 py-2 rounded text-white'>
                  {/* Add to cart icon */}
                  <div className='animate-bounce'>
                    <BsCart4 size={28} className='cursor-pointer'/>
                  </div>
                  <div className='font-semibold cursor-pointer'>
                    {
                      cartItem[0] ? (
                        <div>
                          <p>{totalQty} Items</p>
                          <p>{displayPriceinRupees(totalPrice)}</p>
                        </div>
                      ) : (
                          <p>My Cart</p>
                      )
                    }

                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
      {
        openCartSection && (
          <CartItemDisplay close={ ()=>setOpenCartSection(false) } />
        )
      }
    </header>
  )
}

export default Header