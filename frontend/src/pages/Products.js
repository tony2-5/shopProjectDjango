import React,{ useState,useEffect } from "react";
import api from "../api";

export default function Products() {
  const [products,setProducts] = useState(null)
  const getProducts = async () => {
    const res = await api.get('/api/displayproducts/')
    setProducts(res.data)
  }
  const addToCart = async (id) => {
    const res = await api.post('/api/addcartproduct/',{"product":id})
    console.log(res)
  }
  useEffect(()=> {
    getProducts()
  },[])
  useEffect(()=> {
    console.log(products)
  },[products])
  return (
    <div>hi{products && products.map(product=> 
      <ul>
        <li>{product.productName}</li>
        <li>{product.price}</li>
        <li><img src={product.image}></img></li>
        <button onClick={()=>addToCart(product.id)}></button>
      </ul>
    )}</div>
  )
}