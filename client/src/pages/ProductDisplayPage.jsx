import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { displayPriceinRupees } from "../utils/displayPriceinRupees.js"
import Divider from "../component/Divider.jsx"
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/Best_Prices_Offers.png"
import image3 from "../assets/Wide_Assortment.png"
import { pricewithDiscount } from '../utils/PriceWithDiscount.js'
import AddToCartButton from '../component/AddToCartButton.jsx'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: [],
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()


  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img src={data.image[image]} alt="product image" className='w-full h-full object-scale-down' />
        </div>
        <div className='flex items-center justify-center gap-3 my-5'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-300 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-500"}`}></div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 shadow cursor-pointer' key={img + index}>
                    <img onClick={() => setImage(index)} src={img} alt="mini-product-image" className='w-full h-full object-scale-down' />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full h-full -ml-3 flex justify-between absolute items-center'>
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-justify text-sm'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-justify text-sm'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element }</p>
                  <p className='text-justify text-sm'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='p-4 lg:pl-8 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 minute</p>
        <Divider />
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p>{data.unit}</p>
        <Divider />
        <div>
          <p className=''>Price</p>
          <div className='flex items-center gap-2 lg:gap-5'>
            <div className='border border-green-500 px-4 py-2 rounded-2xl bg-green-100 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{displayPriceinRupees(pricewithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through'>{displayPriceinRupees(data.price) }</p>
              )
            }
            {
              data.discount && (
                <p className='font-bold text-green-700 lg:text-2xl'>{data.discount}% <span className='text-base'>Discount</span></p>
              )
            }
          </div>
        </div>
        {
          data.stock === 0 ? (
            <p className='text-lg text-red-600 my-2'>Out of Stock</p>
          ) : (
              <div className='my-4'>
                <AddToCartButton data={data} />
              </div>
          )
        }

        <Divider />
        <h2 className='font-semibold'>Why shop from binkyit ?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img src={image1} alt="superfast delivery" className='w-20 h-20' />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstep at earliest from dark stores near you.</p>
            </div>
          </div>

          <div className='flex items-center gap-4 my-4'>
            <img src={image2} alt="best price offer" className='w-20 h-20' />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>

          <div className='flex items-center gap-4 my-4'>
            <img src={image3} alt="Wide Assortment" className='w-20 h-20' />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products across food personal care, household & other categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage