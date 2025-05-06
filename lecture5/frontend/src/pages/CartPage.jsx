"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import "./pages.css"

export default function CartPage() {
  // Sample cart items - in a real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: "Pro Runner Shoes",
      price: 129.99,
      category: "Running",
      image: "/api/placeholder/300/300",
      quantity: 1,
    },
    {
      id: 202,
      name: "Indoor Basketball",
      price: 59.99,
      category: "Basketball",
      image: "/api/placeholder/300/300",
      quantity: 2,
    },
  ])

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
  const total = subtotal + tax + shipping

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>

      <div className="container">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <a href="/" className="cta-button">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              <div className="cart-header">
                <span className="product-col">Product</span>
                <span className="price-col">Price</span>
                <span className="quantity-col">Quantity</span>
                <span className="total-col">Total</span>
                <span className="action-col"></span>
              </div>

              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="product-col">
                    <div className="cart-product">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-product-image" />
                      <div className="cart-product-info">
                        <h3>{item.name}</h3>
                        <span className="product-category">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="price-col">${item.price.toFixed(2)}</div>
                  <div className="quantity-col">
                    <div className="quantity-adjuster">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="total-col">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="action-col">
                    <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </button>
              <a href="/" className="continue-shopping">
                Continue Shopping
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
