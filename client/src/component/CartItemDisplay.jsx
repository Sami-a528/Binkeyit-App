import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { displayPriceinRupees } from '../utils/displayPriceinRupees'
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import emptyImage from "../assets/empty_cart.webp"
import toast from 'react-hot-toast'

const CartItemDisplay = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }
        toast("Please Login")
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoIosCloseCircle size={25} />
                    </Link>
                    <button onClick={close} className='cursor-pointer hidden lg:block'>
                        <IoIosCloseCircle size={25}/>
                    </button>
                </div>
                <div className='min-h-[75vh] lg:min-h-[85vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {/* Display items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-2xl'>
                                    <p>Your total savings</p>
                                    <p>&nbsp;{displayPriceinRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-4'>
                                                        <div className='h-16 w-16 min-h-16 min-w-16 bg bg-red-500 border '>
                                                            <img src={item?.productId?.image[0]} alt="product image" className='object-scale-down' />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-slate-500'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{displayPriceinRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className='bg-white p-4'>
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Total items</p>
                                        <p className='flex items-center gap-3'><span className='line-through text-neutral-500'>{displayPriceinRupees(notDiscountTotalPrice)}</span><span>{ displayPriceinRupees(totalPrice) }</span></p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Total Quantity</p>
                                        <p className='flex items-center gap-3'>{ totalQty } items</p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Delivery Charge</p>
                                        <p className='flex items-center gap-3'>Free</p>
                                    </div>
                                    <div className='font-semibold flex items-center justify-between gap-4'>
                                        <p>Grand total</p>
                                        <p>{ displayPriceinRupees(totalPrice) }</p>
                                    </div>
                                </div>
                            </>
                        ): (
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img src={emptyImage} alt="emty cart image" className='w-full h-full object-scale-down' /> 
                                <Link onClick={close} to={"/"} className='block bg-green-700 px-4 py-2 text-white font-semibold rounded-2xl mb-1 cursor-pointer'>Shop Now</Link>
                            </div> 
                        )
                    }
                    
                </div>

                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-green-800 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                                <div>
                                    {
                                        displayPriceinRupees(totalPrice)
                                    }
                                </div>
                                <button onClick={handleCheckoutPage} className='flex items-center gap-1 cursor-pointer'>
                                    Proceed
                                    <span><FaAngleRight /></span>
                                </button>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </section>
    )
}

export default CartItemDisplay