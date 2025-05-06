"use client"

import { useState } from "react"
import "./pages.css"

export default function CategoriesPage() {
  const categories = [
    { id: "running", name: "Running", image: "/api/placeholder/800/300" },
    { id: "basketball", name: "Basketball", image: "/api/placeholder/800/300" },
    { id: "football", name: "Football", image: "/api/placeholder/800/300" },
    { id: "tennis", name: "Tennis", image: "/api/placeholder/800/300" },
    { id: "golf", name: "Golf", image: "/api/placeholder/800/300" },
  ]

  const [selectedCategory, setSelectedCategory] = useState(null)

  // Sample products for the selected category
  const categoryProducts = {
    running: [
      { id: 101, name: "Pro Runner Shoes", price: 129.99, image: "/api/placeholder/300/300" },
      { id: 102, name: "Performance Socks", price: 14.99, image: "/api/placeholder/300/300" },
      { id: 103, name: "Running Shorts", price: 39.99, image: "/api/placeholder/300/300" },
      { id: 104, name: "Hydration Belt", price: 24.99, image: "/api/placeholder/300/300" },
      { id: 105, name: "Fitness Tracker", price: 99.99, image: "/api/placeholder/300/300" },
      { id: 106, name: "Compression Sleeve", price: 19.99, image: "/api/placeholder/300/300" },
    ],
    basketball: [
      { id: 201, name: "Basketball Pro Jersey", price: 89.99, image: "/api/placeholder/300/300" },
      { id: 202, name: "Indoor Basketball", price: 59.99, image: "/api/placeholder/300/300" },
      { id: 203, name: "Basketball Shoes", price: 149.99, image: "/api/placeholder/300/300" },
      { id: 204, name: "Arm Sleeve", price: 19.99, image: "/api/placeholder/300/300" },
      { id: 205, name: "Basketball Shorts", price: 34.99, image: "/api/placeholder/300/300" },
      { id: 206, name: "Training Vest", price: 29.99, image: "/api/placeholder/300/300" },
    ],
    football: [
      { id: 301, name: "Football Training Kit", price: 149.99, image: "/api/placeholder/300/300" },
      { id: 302, name: "Match Ball", price: 99.99, image: "/api/placeholder/300/300" },
      { id: 303, name: "Football Boots", price: 189.99, image: "/api/placeholder/300/300" },
      { id: 304, name: "Shin Guards", price: 24.99, image: "/api/placeholder/300/300" },
      { id: 305, name: "Team Jersey", price: 79.99, image: "/api/placeholder/300/300" },
      { id: 306, name: "Goal Keeper Gloves", price: 49.99, image: "/api/placeholder/300/300" },
    ],
    tennis: [
      { id: 401, name: "Tennis Racket Elite", price: 199.99, image: "/api/placeholder/300/300" },
      { id: 402, name: "Tennis Balls (3-pack)", price: 9.99, image: "/api/placeholder/300/300" },
      { id: 403, name: "Court Shoes", price: 119.99, image: "/api/placeholder/300/300" },
      { id: 404, name: "Tennis Shorts", price: 44.99, image: "/api/placeholder/300/300" },
      { id: 405, name: "Wristbands", price: 14.99, image: "/api/placeholder/300/300" },
      { id: 406, name: "Tennis Bag", price: 79.99, image: "/api/placeholder/300/300" },
    ],
    golf: [
      { id: 501, name: "Golf Clubs Set", price: 899.99, image: "/api/placeholder/300/300" },
      { id: 502, name: "Golf Balls (12-pack)", price: 39.99, image: "/api/placeholder/300/300" },
      { id: 503, name: "Golf Shoes", price: 159.99, image: "/api/placeholder/300/300" },
      { id: 504, name: "Golf Gloves", price: 24.99, image: "/api/placeholder/300/300" },
      { id: 505, name: "Golf Bag", price: 129.99, image: "/api/placeholder/300/300" },
      { id: 506, name: "Golf Polo Shirt", price: 49.99, image: "/api/placeholder/300/300" },
    ],
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Categories</h1>
      </div>

      <div className="container">
        <div className="categories-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-banner ${selectedCategory === category.id ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <img src={category.image} alt={category.name} />
              <h2>{category.name}</h2>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="category-products">
            <h2>{categories.find((c) => c.id === selectedCategory).name} Products</h2>
            <div className="product-grid">
              {categoryProducts[selectedCategory].map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-price">${product.price}</span>
                    <button className="add-to-cart">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedCategory && (
          <div className="category-prompt">
            <h2>Select a category to view products</h2>
          </div>
        )}
      </div>
    </div>
  )
}
