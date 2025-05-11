"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./pages.css"
import { getAllProducts } from "../services/api/product"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../redux/features/productSlice"

export default function Home() {
  const allProducts = useSelector((state) => state.products.value)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const categories = [
    {
      id: "running",
      name: "Running",
      image:
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "High-performance gear for every runner",
    },
    {
      id: "basketball",
      name: "Basketball",
      image:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Dominate the court with premium equipment",
    },
    {
      id: "football",
      name: "Football",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Everything you need for the beautiful game",
    },
    {
      id: "tennis",
      name: "Tennis",
      image:
        "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Professional gear for court champions",
    },
  ]

  const fetchProduct = async () => {
    try {
      const products = await getAllProducts()
      dispatch(setProducts(products))
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Gear Up For Greatness</h1>
          <p>Premium sports equipment for athletes of all levels</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </div>

      <div className="container">
        <section className="featured-section">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : allProducts?.length === 0 ? (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Check back soon for our latest products!</p>
            </div>
          ) : (
            <div className="product-grid">
              {allProducts?.slice(0, 8).map((product) => (
                <div className="product-card" key={product._id}>
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div className="product-image">
                      <img
                        src={
                          product.image ||
                          "https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png"
                        }
                        alt={product.name}
                      />
                      {product?.sale?.live && <span className="sale-badge">Sale</span>}
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product?.category?.name}</span>
                      <h3 className="product-name">{product?.name}</h3>
                      <div className="price-container">
                        {product.sale?.live ? (
                          <>
                            <span className="original-price">${product?.price.toFixed(2)}</span>
                            <span className="sale-price">
                              $
                              {(
                                product?.price -
                                (product?.sale?.discountPercentage
                                  ? (product.sale.discountPercentage * product.price) / 100
                                  : product.sale.discountAmount)
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="product-price">${product?.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="categories-section">
          <h2>Shop By Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link to={`/categories`} className="category-card-home" key={category.id}>
                <div className="category-image">
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-link">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="promo-banner">
          <div className="promo-content">
            <h2>Summer Collection 2025</h2>
            <p>Discover our latest innovations designed for peak performance</p>
            <Link to="/new-arrivals" className="cta-button">
              Explore Collection
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
