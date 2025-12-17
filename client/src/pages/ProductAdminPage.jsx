import React from 'react'
import { useState } from 'react'
import summaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { useEffect } from 'react'
import Loading from '../component/Loading'
import ProductCartAdmin from '../component/ProductCartAdmin'
import { IoSearchOutline } from "react-icons/io5";

const ProductAdminPage = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePrevios = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300)

    return () => {
      clearTimeout(interval)
    }
  }, [search])
  

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full min-w-26 ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded-2xl border focus-within:border-amber-400'>
          <IoSearchOutline size={25}/>
          <input value={search} onChange={handleOnChange} type="text" placeholder='Search product here...' className='h-full outline-none bg-transparent' />
        </div>
      </div>
      {
        loading && (
          <Loading/>
        )
      }

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[60vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {
              productData.map((p, index) => {
                return (
                  <ProductCartAdmin data={p} fetchProductData={ fetchProductData } />
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-between'>
          <button onClick={handlePrevios} className='border border-green-300 px-4 py-1 cursor-pointer hover:bg-green-500'>Previous</button>
          <button className='w-full bg-slate-200'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-green-300 px-4 py-1 cursor-pointer hover:bg-green-500'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default ProductAdminPage