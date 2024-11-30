import React, {useEffect, useState} from "react";
import api from "../api"
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom"


export default function Cart() {
  const [cart,setCartItems] = useState(null)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  const initializeCart = async () => {
    const res2 = await api.get('/api/displaycart/')
    // get product id's from cart
    setCartItems(res2.data.map(d=>[d.product, d.quantity]))
  }

  const deleteFromCart = async (id) => {
    const res = await api.post('/api/deletecartproduct/',{"product":id})
    const res2 = await api.get('/api/displaycart/')
    setCartItems(res2.data.map(d=>[d.product, d.quantity]))
  }

  const checkOut = async () => {
    if(total>0) {
      let productIds=cart.map(d=>d[0].id)
      const res = await api.post('/api/checkout/',{"products":productIds})
      if(res.status===200) {
        navigate("/thankyou", {state:{total:total}})
      }
    }
  }

  useEffect(()=>{
    initializeCart()
  },[])
  useEffect(()=> {
    if(cart) {
      let newTotal = cart.reduce((accumualtor, product)=>{
        return accumualtor+=product[1]*parseFloat(product[0].price)
      },0)
      setTotal(newTotal)
    }
  },[cart])

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <div className="row p-3 justify-content-between">
          <div className="col-6">
            <div className="row">
              {
                cart && cart.map((product) => (
                  <div className="col-6 p-3">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-center">Product: {product[0].productName}</li>
                      <li className="list-group-item d-flex justify-content-center"><img className="img-fluid" src={product[0].image}></img></li>
                      <li  className="list-group-item d-flex justify-content-center">Quantity: {product[1]}</li>
                      <button  className="list-group-item list-group-item-action bg-primary d-flex justify-content-center" 
                      onClick={()=>deleteFromCart(product[0].id)}>
                        Delete
                      </button>
                    </ul>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="card col-4">
            <div className="form-group p-3">
              <label for="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter name"/>
            </div>
            <div className="form-group p-3">
              <label for="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="22 Example Rd"/>
            </div>
            <div className="row p-3">
              <div className="form-group col-6">
                <label for="address">State</label>
                <input type="text" className="form-control" id="state" placeholder="New Jersey"/>
              </div>
              <div className="form-group col-6">
                <label for="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="99999"/>
              </div>
            </div>
            <div className="form-group p-3">
              <label for="card">Card Number</label>
              <input type="text" className="form-control" id="card" placeholder="9999-9999-9999-9999"/>
            </div>
            <div className="form-group d-flex justify-content-center p-3">
              <h5>Total: ${total}</h5>
            </div>
            <div className="form-group d-flex justify-content-center p-3">
              <button className="btn btn-primary" disabled={total===0} onClick={checkOut}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}