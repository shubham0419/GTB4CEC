"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"
import "./pages.css"

export default function NewArrivalsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "newest",
  })
  const [loading, setLoading] = useState(false)

  const newArrivals = [
    {
      id: 1001,
      name: "Ultralight Running Jacket",
      price: 89.99,
      category: "Running",
      date: "New this week",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1002,
      name: "Pro Series Basketball",
      price: 49.99,
      category: "Basketball",
      date: "New this week",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1003,
      name: "Limited Edition Cleats",
      price: 179.99,
      category: "Football",
      date: "New this week",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1004,
      name: "Carbon Fiber Tennis Racket",
      price: 249.99,
      category: "Tennis",
      date: "New this week",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1005,
      name: "Smart Training Basketball",
      price: 69.99,
      category: "Basketball",
      date: "Just arrived",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1006,
      name: "Performance Swim Goggles",
      price: 34.99,
      category: "Swimming",
      date: "Just arrived",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1007,
      name: "Trail Running Backpack",
      price: 59.99,
      category: "Running",
      date: "Just arrived",
      image: "/api/placeholder/300/300",
    },
    {
      id: 1008,
      name: "Golf Laser Rangefinder",
      price: 199.99,
      category: "Golf",
      date: "Just arrived",
      image: "/api/placeholder/300/300",
    },
  ]

  const categories = ["all", "Running", "Basketball", "Football", "Tennis", "Golf", "Swimming"]

  // Filter products based on selected filters
  const getFilteredProducts = () => {
    let filtered = [...newArrivals]

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "priceLow":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // Already sorted by newest in our mock data
        break
      default:
        break
    }

    return filtered
  }

  const filteredProducts = getFilteredProducts()

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [filters])

  return (
    <div className="page">
      <div className="page-header">
        <h1>New Arrivals</h1>
      </div>

      <div className="container">
        <div className="featured-banner">
          <div className="banner-content">
            <span className="banner-tag">Just Dropped</span>
            <h2>Spring Collection 2025</h2>
            <p>Discover our latest innovations designed for peak performance</p>
            <button className="cta-button">Explore Collection</button>
          </div>
          <img src="/api/placeholder/800/400" alt="Spring Collection" />
        </div>

        <section className="new-products-section">
          <div className="section-header">
            <h2>Latest Products</h2>
            <button className="filter-toggle-btn" onClick={toggleFilters}>
              <Filter size={18} />
              <span>Filters</span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {showFilters && (
            <div className="product-filters">
              <div className="filter-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sortBy">Sort By:</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try selecting a different category or check back soon for new arrivals.</p>
              <button className="cta-button" onClick={() => setFilters({ category: "all", sortBy: "newest" })}>
                View All Products
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} />
                      <span className="product-badge">{product.date}</span>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Sign up for our newsletter to be the first to know about new products and exclusive offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="cta-button">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
