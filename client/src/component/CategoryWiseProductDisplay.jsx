import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import validURLConvert from '../utils/validURLConvert.js'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCartNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })
            const { data: responseData } = response
            console.log(responseData)

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
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }
    const handleRedirectProductListPage = () => {
        const subcategory = subCategoryData?.find(sub =>
            sub.category?.some(c => c._id == id)
        );

        if (!subcategory) {
            console.warn("No subcategory found for category:", id, name);
            return `/${validURLConvert(name)}-${id}`;
        }

        return `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory?.name)}-${subcategory?._id}`;
    };

    const redirectURL = handleRedirectProductListPage()
    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-500 hover:text-green-700'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                        loading &&
                        loadingCartNumber.map((_, index) => {
                            return (
                                <CardLoading key={"categoryWiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p._id + "categoryWiseProductDisplay" + index} />
                            )
                        })
                    }
                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg text-lg p-2 rounded-full cursor-pointer'>
                        <FaAnglesLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg text-lg p-2 rounded-full cursor-pointer'>
                        <FaAnglesRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay