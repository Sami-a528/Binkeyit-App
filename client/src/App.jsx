import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUserDetails } from "./store/userSlice.js"
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice.js';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios.js';
import summaryApi from './common/summaryApi.js';
import GlobalProvider from './provider/GlobalProvider';
import CartMobile from './component/CartMobile.jsx';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...summaryApi.getCategory,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }
      // console.log(responseData);
    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getSubCategory,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }
      // console.log(responseData);
    } catch (error) {

    } finally {

    }
  }



  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])

  return (
    <GlobalProvider>
      <Header />
      <main className='min-h-[83vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== "/checkout" && (
          <CartMobile/>
        )
      }
    </GlobalProvider>
  )
}

export default App
