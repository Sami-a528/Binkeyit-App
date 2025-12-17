import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'
import Loading from '../component/Loading';
import NoData from '../component/NoData';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import EditCategory from '../component/EditCategory';
import ConfirmDeleteBox from '../component/ConfirmDeleteBox';
import toast from "react-hot-toast";
import AxiosToastError from '../utils/AxiosToastError';


const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        image: "",
    })
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    })

    const fetchCategory = async () => {
        try {
            setLoading(false)
            const response = await Axios({
                ...summaryApi.getCategory,
            })
            const { data: responseData } = response

            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])
    const handleDeleteCategory = async() => {
        try {
            const response = await Axios({
                ...summaryApi.deleteCategory,
                data: deleteCategory,
            })
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-amber-300 hover:bg-amber-300 px-3 py-1 rounded-2xl cursor-pointer'>Add Category</button>
            </div>

            {
                !categoryData[0] && !loading && (
                    <NoData />
                )
            }

            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {
                    categoryData.map((category, index) => {
                        return (
                            <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                                <img alt={category.name} src={category.image} className='w-full object-scale-down' />
                                <div className='items-center h-9 flex gap-2'>
                                    <button onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(category)
                                    }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded-2xl cursor-pointer'>Edit</button>
                                    <button onClick={() => {
                                        setOpenConfirmBoxDelete(true)
                                        setDeleteCategory(category)
                                    }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded-2xl cursor-pointer'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                loading && (
                    <Loading />
                )
            }

            {
                openUploadCategory && (
                    <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
                )
            }

            {
                openEdit && (
                    <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
                )
            }

            {
                openConfirmBoxDelete && (
                    <ConfirmDeleteBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
                )
            }
        </section>
    )
}

export default CategoryPage