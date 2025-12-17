import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../component/Loading';
import ViewImage from "../component/ViewImage";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import AddFieldComponenet from '../component/AddFieldComponenet';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/successAlert';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [openAddFields, setOpenAddFields] = useState(false);
  const [fieldName, setFieldName] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)

    const response = await uploadImage(file)
    const { data: ImageResponse } = response

    const imageUrl = ImageResponse.data.url
    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
    // console.log("file", file);
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async(index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve,
      }
    })
  }

  const handleRemoveSubCategory = async(index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve,
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName] : "",
        }
      }
    })
    setFieldName("");
    setOpenAddFields(false);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("data", data)
    try {
      const response = await Axios({
        ...summaryApi.createProduct,
        data: data,
      })
      const { data: responseData } = response
      
      if (responseData.success) {
        successAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input id='name' type="text" placeholder='Enter product name' value={data.name} name='name' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded' required />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description</label>
            <textarea multiple rows={2} id='description' type="text" placeholder='Enter product description' value={data.description} name='description' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded resize-none' required />
          </div>

          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor="productImage" className='bg-blue-50 h-24 border rounded flex justify-center items-center'>
                <div className='text-center flex justify-center items-center flex-col cursor-pointer'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input accept='image/*' onChange={handleUploadImage} type="file" id='productImage' className='hidden' />
              </label>
              {/* display uploaded images */}
              <div className='flex flex-wrap gap-5'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 w-20 mt-2 min-w-20 bg-blue-50 border relative group'>
                        <img src={img} alt={img} onClick={() => setViewImageUrl(img)} className='w-full h-full object-scale-down cursor-pointer ' />

                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-700 cursor-pointer rounded-tl-full hidden group-hover:block'>
                          <MdDeleteOutline />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="" className='font-medium'>Category</label>
            <div>
              <select
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find(el => el._id === value);

                  if (!category) return;

                  setData(prev => ({
                    ...prev,
                    category: [...prev.category, category]
                  }));

                  setSelectCategory("");
                }}
                className='bg-blue-50 border w-full rounded p-2'
              >
                <option value="">Select Category</option>

                {allCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='cursor-pointer hover:text-red-500' onClick={()=>handleRemoveCategory(index)}>
                          <IoIosCloseCircle size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="" className='font-medium'>Sub Category</label>
            <div>
              <select
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(el => el._id === value);

                  if (!subCategory) return;

                  setData(prev => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory]
                  }));

                  setSelectSubCategory("");
                }}
                className='bg-blue-50 border w-full rounded p-2'
              >
                <option value="">Select Sub Category</option>

                {allSubCategory.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id+index+"subCategory"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveSubCategory(index)}>
                          <IoIosCloseCircle size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='unit' className='font-medium'>Unit</label>
            <input id='unit' type="text" placeholder='Enter product unit' value={data.unit} name='unit' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded' required />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input id='stock' type="number" placeholder='Enter product stock' value={data.stock} name='stock' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded' required />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input id='price' type="number" placeholder='Enter product price' value={data.price} name='price' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded' required />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input id='discount' type="number" placeholder='Enter product discount' value={data.discount} name='discount' onChange={handleChange} className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded' required />
          </div>

          {/* Add More Fields */}
          <div>
            {
              Object.keys(data.more_details).map((k, index) => {
                return (
                  <div key={k + index} className='grid gap-1'>
                    <label htmlFor={k}>{k}</label>
                    <input
                      id={k}
                      type="text"
                      value={data.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => ({
                          ...preve,
                          more_details: {
                            ...preve.more_details,
                            [k]: value,
                          }
                        }));
                      }}
                      className='bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded'
                      required
                    />
                  </div>
                );
              })
            }
          </div>

          <div onClick={()=>setOpenAddFields(true)} className='inline-block bg-amber-300 mb-2 hover:bg-amber-500 py-1 px-3 w-40 text-center font-semibold cursor-pointer rounded-2xl'>
            Add others fields
          </div>
          <button className='bg-green-500 cursor-pointer hover:bg-green-300 py-2 rounded-2xl font-semibold'>
            Submit
          </button>
        </form>
        </div>
      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
        )
      }

      {
        openAddFields && (
          <AddFieldComponenet value={fieldName} onChange={(e) => setFieldName(e.target.value)} submit={handleAddField} close={()=> setOpenAddFields(false) }/>
        )
      }
    </section>
  )
}

export default UploadProduct