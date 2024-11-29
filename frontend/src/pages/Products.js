import React,{ useState,useEffect } from "react";
import api from "../api";
import NavBar from "../components/NavBar";

export default function Products() {
  const [products,setProducts] = useState(null)
  const [quantity, setQuantity] = useState({})
  const getProducts = async () => {
    const res = await api.get('/api/displayproducts/')
    setProducts(res.data)
    console.log(res.data)
  }

  const quantityUpdate = (e, productId) => {
    setQuantity({
      ...quantity,
      [productId]: e.target.value
    })
  }

  const addToCart = async (e,id) => {
    console.log(e)
    // const res = await api.post('/api/createcart/')
    // const res2 = await api.post('/api/addcartproduct/',{"product":id, "quantity":1})
    // console.log(res2)
    // console.log(res)
  }

  useEffect(()=> {
    getProducts()
  },[])

  useEffect(()=> {
    console.log(products)
  },[products])

  return (
    <>
      <NavBar></NavBar>
      <div className="container pt-3">
        <div className="row">
          {products && products.map(product=> 
          <div className="col-4">
            <ul className="list-group">
              <li className="list-group-item">{product.productName}</li>
              <li className="list-group-item">{product.price}</li>
              <li className="list-group-item"><img className="img-fluid" src={product.image}></img></li>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity[product.id] || 1}
                className="list-group-item" 
                onChange={(e)=>quantityUpdate(e, product.id)}
              />
              <button className="list-group-item  list-group-item-action bg-primary"
              onClick={()=>addToCart(product.id)}>
                Add To Cart
              </button>
            </ul>
          </div>
          )}
        </div>
      </div>
    </>
  )
}