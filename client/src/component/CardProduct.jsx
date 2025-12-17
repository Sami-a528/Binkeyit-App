import React, { useState } from 'react'
import { displayPriceinRupees } from '../utils/displayPriceinRupees'
import { Link } from 'react-router-dom'
import validURLConvert from '../utils/validURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import Axios from "../utils/Axios.js"
import summaryApi from '../common/summaryApi.js'
import AxiosToastError from "../utils/AxiosToastError.js"
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider.jsx'
import AddToCartButton from './AddToCartButton.jsx'

const CardProduct = ({ data }) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`

    return (
        <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img src={data.image[0]} alt="" className='w-full h-full object-scale-down lg:scale-110' />
            </div>
            <div className='flex items-center justify-between gap-2'>
                <div className='rounded-2xl text-xs w-fit p-px px-2 text-green-600 bg-green-100'>
                    10 min
                </div>
                <div>
                    {
                        Boolean(data.discount) && (
                            <p className='text-green-600 bg-green-200 px-2 w-fit text-xs rounded-2xl'>{data.discount}% Disc.</p>
                        )
                    }
                </div>
            </div>
            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                {data.name}
            </div>
            <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>
            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold'>
                        {displayPriceinRupees(pricewithDiscount(data.price, data.discount))}
                    </div>
                </div>
                <div className=''>
                    {
                        data.stock == 0 ? (
                            <p className='text-red-500  text-center'>Out of Stock</p>
                        ) : (
                            <AddToCartButton data={data}/>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default CardProduct