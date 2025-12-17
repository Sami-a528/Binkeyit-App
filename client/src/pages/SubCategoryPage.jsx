import React, { useState } from 'react'
import UploadSubCategoryModel from '../component/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import { useEffect } from 'react'
import TableDisplay from '../component/TableDisplay'
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from '../component/ViewImage'
import { BsPencil } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import EditSubCategory from '../component/EditSubCategory'
import ConfirmDeleteBox from "../component/ConfirmDeleteBox"
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoding] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL, setImageURL] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      setLoding(true)
      const response = await Axios({
        ...summaryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor("name", {
      header: "Name"
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row", row.original.image)
        return <div className='flex justify-center items-center cursor-pointer'>
          <img src={row.original.image} alt={row.original.name} className='w-8 h-8' onClick={() => {
            setImageURL(row.original.image)
          }} />
        </div>
      }
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex justify-center items-center gap-3'>
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-100 rounded-full cursor-pointer hover:bg-green-600'>
              <BsPencil size={20} />
            </button>
            <button onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }} className='p-2 bg-red-100 rounded-full cursor-pointer hover:bg-red-600'>
              <MdDeleteOutline size={20} />
            </button>
          </div>
        )
      }
    })

  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteSubCategory,
        data: deleteSubCategory,
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setOpenAddSubCategory(true)} className='text-sm border border-amber-300 hover:bg-amber-300 px-3 py-1 rounded-2xl cursor-pointer'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <TableDisplay data={data} column={column} />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} fetchData={fetchSubCategory} />
        )
      }

      {
        ImageURL &&
        <ViewImage url={ImageURL} close={() => setImageURL("")} />
      }

      {
        openEdit &&
        <EditSubCategory data={editData} close={() => setOpenEdit(false)} />
      }

      {
        openDeleteConfirmBox && (
          <ConfirmDeleteBox cancel={() => setOpenDeleteConfirmBox(false)} close={() => setOpenDeleteConfirmBox(false)} confirm={handleDeleteSubCategory} />
        )
      }
    </section>
  )
}

export default SubCategoryPage