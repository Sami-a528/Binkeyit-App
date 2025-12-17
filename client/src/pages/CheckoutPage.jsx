import React, { useState } from 'react'
import { displayPriceinRupees } from '../utils/displayPriceinRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../component/AddAddress'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useNavigate } from "react-router-dom"
import { loadStripe} from "@stripe/stripe-js"

const CheckoutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
    const [opneAddress, setOpenAddress] = useState(false)
    const addressList = useSelector(state => state.address.addressList)
    const [selectAddress, setSelectAddress] = useState(0)
    const cartItemsList = useSelector(state => state.cartItem.cart)
    const navigate = useNavigate()

    const handleCashOnDelivery = async () => {
        try {
            const response = await Axios({
                ...summaryApi.cashOnDeliveryOrder,
                data: {
                    list_items: cartItemsList,
                    addressId: addressList[selectAddress]?._id,
                    totalAmt: totalPrice,
                    subTotalAmt: totalPrice,
                }
            })

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
                if (fetchOrder) {
                    fetchOrder()
                }
                navigate("/success", {
                    state: {
                        text: "Order"
                    }
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleOnlinePayment = async () => {
        try {
            toast.loading("Loading...")
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublicKey)

            const response = await Axios({
                ...summaryApi.payment_url,
                data: {
                    list_items: cartItemsList,
                    addressId: addressList[selectAddress]?._id,
                    totalAmt: totalPrice,
                    subTotalAmt: totalPrice,
                }
            })
            const { data: responseData } = response
            stripePromise.redirectToCheckout({ sessionId: responseData.id })
            
            if (fetchCartItem) {
                fetchCartItem()
            }
            if (fetchOrder) {
                fetchOrder()
            }
            
        } catch (error) {
            AxiosToastError(error)
        }
    }


    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full'>
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label key={address._id || index} htmlFor={"address" + index} className={address.status ? "" : "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50 cursor-pointer'>
                                            <div>
                                                <input type="radio" id={"address" + index} onChange={(e)=>setSelectAddress(e.target.value)} name="address" value={index} className='cursor-pointer'/>
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>   
                                        </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                            Add address
                        </div>
                    </div>
                </div>

                <div className='w-full max-w-md bg-white py-4 px-2'>
                    <h3 className='text-lg font-semibold'>Summary</h3>
                    <div className='bg-white p-4'>
                        <h3 className='font-semibold'>Bill details</h3>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Total items</p>
                            <p className='flex items-center gap-3'><span className='line-through text-neutral-500'>{displayPriceinRupees(notDiscountTotalPrice)}</span><span>{displayPriceinRupees(totalPrice)}</span></p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Total Quantity</p>
                            <p className='flex items-center gap-3'>{totalQty} items</p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-3'>Free</p>
                        </div>
                        <div className='font-semibold flex items-center justify-between gap-4'>
                            <p>Grand total</p>
                            <p>{displayPriceinRupees(totalPrice)}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded-2xl cursor-pointer text-white font-semibold'>
                            Online Payment
                        </button>
                        <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 font-semibold text-green-700 hover:bg-green-600 hover:text-white cursor-pointer rounded-2xl'>
                            Cash on Delivery
                        </button>
                    </div>
                </div>
            </div>

            {
                opneAddress && (
                    <AddAddress close={ ()=> setOpenAddress(false) } />
                )
            }
        </section>
    )
}

export default CheckoutPage