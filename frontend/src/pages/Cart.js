import React, {useEffect, useState} from "react";
import api from "../api"
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom"


export default function Cart() {
  const navigate = useNavigate()
  const [cart,setCartItems] = useState(null)
  const initializeCart = async () => {
    const res2 = await api.get('/api/displaycart/')
    console.log(res2)
    // get product id's from cart
    setCartItems(res2.data[0].product)
  }
  const deleteFromCart = async (id) => {
    const res = await api.post('/api/deletecartproduct/',{"product":id})
    console.log(res)
  }
  useEffect(()=>{
    initializeCart()
  },[])
  useEffect(()=> {
    console.log(cart)
  },[cart])
  return (
    <>
      <NavBar></NavBar>
      <div>
        {/* {
          cart && cart.map((product) => (
            <ul>
              <li>{product}</li>
              <button onClick={()=>deleteFromCart(product)}></button>
            </ul>
          ))
        } */}
      </div>
    </>
  )
}