"use client"

import { useState } from "react"
import "./pages.css"

export default function SalesPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const saleProducts = [
    {
      id: 601,
      name: "Lightweight Running Shoes",
      originalPrice: 129.99,
      salePrice: 89.99,
      discount: "30%",
      category: "Running",
      image: "/api/placeholder/300/300",
    },
    {
      id: 602,
      name: "Team Basketball Jersey",
      originalPrice: 79.99,
      salePrice: 59.99,
      discount: "25%",
      category: "Basketball",
      image: "/api/placeholder/300/300",
    },
    {
      id: 603,
      name: "All-Weather Football",
      originalPrice: 49.99,
      salePrice: 34.99,
      discount: "30%",
      category: "Football",
      image: "/api/placeholder/300/300",
    },
    {
      id: 604,
      name: "Tennis Practice Net",
      originalPrice: 199.99,
      salePrice: 149.99,
      discount: "25%",
      category: "Tennis",
      image: "/api/placeholder/300/300",
    },
    {
      id: 605,
      name: "Golf Practice Set",
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: "33%",
      category: "Golf",
      image: "/api/placeholder/300/300",
    },
    {
      id: 606,
      name: "Compression Sleeves (Pair)",
      originalPrice: 29.99,
      salePrice: 19.99,
      discount: "33%",
      category: "Running",
      image: "/api/placeholder/300/300",
    },
    {
      id: 607,
      name: "Basketball Training Set",
      originalPrice: 149.99,
      salePrice: 99.99,
      discount: "33%",
      category: "Basketball",
      image: "/api/placeholder/300/300",
    },
    {
      id: 608,
      name: "Tennis Wristbands",
      originalPrice: 19.99,
      salePrice: 12.99,
      discount: "35%",
      category: "Tennis",
      image: "/api/placeholder/300/300",
    },
    {
      id: 609,
      name: "Football Training Cones",
      originalPrice: 39.99,
      salePrice: 24.99,
      discount: "37%",
      category: "Football",
      image: "/api/placeholder/300/300",
    },
    {
      id: 610,
      name: "Golf Putting Mat",
      originalPrice: 89.99,
      salePrice: 59.99,
      discount: "33%",
      category: "Golf",
      image: "/api/placeholder/300/300",
    },
  ]

  const categories = ["all", "Running", "Basketball", "Football", "Tennis", "Golf"]

  const filteredProducts =
    activeFilter === "all"
      ? saleProducts
      : saleProducts.filter((product) => product.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div className="page">
      <div className="page-header sales-header">
        <h1>Clearance Sale</h1>
        <div className="sale-countdown">
          <p>Sale Ends In:</p>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="count">2</span>
              <span className="label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="count">16</span>
              <span className="label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="count">45</span>
              <span className="label">Minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === "all" ? "All Products" : category}
            </button>
          ))}
        </div>

        <section className="sale-products-section">
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card sale-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="sale-badge">-{product.discount}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-container">
                    <span className="original-price">${product.originalPrice}</span>
                    <span className="sale-price">${product.salePrice}</span>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="promotion-banner">
          <div className="promotion-content">
            <h2>Extra 15% Off</h2>
            <p>
              Use code <strong>EXTRA15</strong> at checkout
            </p>
            <span className="promo-disclaimer">* Valid on sale items only. Cannot be combined with other offers.</span>
          </div>
        </section>
      </div>
    </div>
  )
}
