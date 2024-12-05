import React,{ useState,useEffect } from "react";
import api from "../api";
import NavBar from "../components/NavBar";

export default function Products() {
  const [products,setProducts] = useState(null)
  const [quantity, setQuantity] = useState({})
  const [totalItems, setTotalItems] = useState(0)
  const [filter, setFilter]=useState("")
  const [search, setSearch]=useState("")

  const getProducts = async () => {
    const res = await api.get('/api/displayproducts/')
    // filter
    if(filter==="priceAsc") {
      res.data.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price))
    }else if(filter==="priceDesc") {
      res.data.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price))
    } else if(filter==="stockAsc") {
      res.data.sort((a,b)=>parseInt(a.stock)-parseInt(b.stock))
    } else if(filter==="stockDesc") {
      res.data.sort((a,b)=>parseInt(b.stock)-parseInt(a.stock))
    }
    // search
    if(search) {
      setProducts(res.data.filter((product)=>
        new RegExp(search,"g").test(product.productName)
      ))
    } else {
      setProducts(res.data)
    }
  }

  const getCart = async () => {
    const res = await api.get('/api/displaycart/')
    let cartItemTotal = res.data.reduce((accumualtor, product)=>{
      return accumualtor+=product.quantity
    },0)
    setTotalItems(cartItemTotal)
  }

  const quantityUpdate = (e, product) => {
    if(e.target.value<=product.stock) {
      setQuantity({
        ...quantity,
        [product.id]: e.target.value
      })
    }
  }

  const addToCart = async (id) => {
    await api.post('/api/addcartproduct/',{"product":id, "quantity":quantity[id]||1})
    getProducts()
    getCart()
    setQuantity({
      ...quantity,
      [id]: 1
    })
  }

  useEffect(()=> {
    getProducts()
  },[filter])

  useEffect(()=> {
    getProducts()
  },[search])

  useEffect(()=> {
    getProducts()
    getCart()
  },[])

  return (
    <>
      <NavBar totalItems={totalItems}></NavBar>
      <div className="container">
        <nav className="d-flex justify-content-between pt-3">
          <div className="form-group d-flex">
            <label className="p-2" for="search">Search:</label>
            <input className="form-control" 
            id="search" 
            type="search" 
            placeholder="Search"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            />
          </div>
          <div className="form-group d-flex">
            <label className="p-2" for="filter">Category Filter:</label>
            <select onChange={(e)=>{setFilter(e.target.value)}} id="filter" className="form-select" style={{"width": "auto"}} aria-label="Category Filter">
              <option selected value="none">None</option>
              <option value="priceAsc">Price ASC</option>
              <option value="priceDesc">Price DESC</option>
              <option value="stockAsc">Stock ASC</option>
              <option value="stockDesc">Stock DESC</option>
            </select>
          </div>
        </nav>
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
                onChange={(e)=>quantityUpdate(e, product)}
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