import React, { useEffect, useState } from 'react'
import CardLoading from "../component/CardLoading"
import Axios from "../utils/Axios.js"
import summaryApi from '../common/summaryApi.js'
import AxiosToastError from "../utils/AxiosToastError.js"
import CardProduct from '../component/CardProduct.jsx'
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from 'react-router-dom'
import noDataImage from "../assets/nothing here yet.webp"


const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async () => {
    setLoading(false)
    try {
      const response = await Axios({
        ...summaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData((preve) => {
            return [
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
        console.log(responseData)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, searchText])

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(preve => preve + 1)
    }
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Result: {data.length}</p>
        <InfiniteScroll dataLength={data.length} hasMore={true} next={handleFetchMore}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>

            {
              data.map((p, index) => {
                return (
                  <CardProduct data={p} key={p?._id + "searchProduct" + index} />
                )
              })
            }

            {/* Loading Data */}
            {
              loading && (
                loadingArrayCard.map((_, index) => {
                  return (
                    <CardLoading key={"loadingsearchPage"+index}/>
                  )
                })
              )
            }
          </div>
        </InfiniteScroll>

        {
          !data[0] && !loading && (
            <div className='flex flex-col justify-center items-center w-full mx-auto'>
              <img src={noDataImage} alt="image" className='w-full h-full max-w-xs max-h-xs block' />
              <h2 className='font-semibold my-2'>No Data found</h2>
            </div> 
          )
        }
      </div>
    </section>
  )
}

export default SearchPage