import React from 'react'
import { useSelector } from 'react-redux'
import NoData from "../component/NoData"
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  console.log("order", orders)

  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Orders</h1>
      </div>
      {
        !orders[0] && (
          <NoData/>
        )
      }

      {
        orders.map((order, index) => {
          return (
            <div key={order._id + index + "order"} className='order rounded p-4 text-sm flex justify-between'>
              <div>
                <p>Order No : {order.orderId}</p>
                <div className='flex items-center gap-3'>
                  <img src={order.product_details.image[0]} alt="order image" className='h-20 w-20' />
                  <p className='font-medium'>{order.product_details.name}</p>
                </div>
              </div>
              <Link to={"/"}><FaAngleRight size={20} /></Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders