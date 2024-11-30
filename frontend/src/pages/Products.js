import React,{ useState,useEffect } from "react";
import api from "../api";
import NavBar from "../components/NavBar";

export default function Products() {
  const [products,setProducts] = useState(null)
  const [quantity, setQuantity] = useState({})

  const getProducts = async () => {
    const res = await api.get('/api/displayproducts/')
    setProducts(res.data)
  }

  const quantityUpdate = (e, productId) => {
    setQuantity({
      ...quantity,
      [productId]: e.target.value
    })
  }

  const addToCart = async (id) => {
    const res = await api.post('/api/createcart/')
    const res2 = await api.post('/api/addcartproduct/',{"product":id, "quantity":quantity[id]||1})
    getProducts()
    setQuantity({
      ...quantity,
      [id]: 1
    })
  }

  useEffect(()=> {
    getProducts()
  },[])

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <div className="row">
          {products && products.filter(product=>product.stock>0).map(product=> 
          <div className="col-4 p-3">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-center">{product.productName}</li>
              <li className="list-group-item d-flex justify-content-center">${product.price}</li>
              <li className="list-group-item d-flex justify-content-center">Stock: {product.stock}</li>
              <li className="list-group-item d-flex justify-content-center"><img className="img-fluid" src={product.image}></img></li>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity[product.id] || 1}
                className="list-group-item" 
                onChange={(e)=>quantityUpdate(e, product.id)}
              />
              <button className="list-group-item list-group-item-action bg-primary d-flex justify-content-center"
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