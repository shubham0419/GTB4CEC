"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"
import "./pages.css"

export default function SalesPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortOption, setSortOption] = useState("discount")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 16,
    minutes: 45,
    seconds: 0,
  })

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

  // Filter and sort products
  const getFilteredProducts = () => {
    // Filter by category
    const filtered =
      activeFilter === "all"
        ? [...saleProducts]
        : saleProducts.filter((product) => product.category.toLowerCase() === activeFilter.toLowerCase())

    // Apply sorting
    switch (sortOption) {
      case "priceLow":
        filtered.sort((a, b) => a.salePrice - b.salePrice)
        break
      case "priceHigh":
        filtered.sort((a, b) => b.salePrice - a.salePrice)
        break
      case "discount":
        filtered.sort((a, b) => {
          const discountA = ((a.originalPrice - a.salePrice) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.salePrice) / b.originalPrice) * 100
          return discountB - discountA
        })
        break
      default:
        break
    }

    return filtered
  }

  const filteredProducts = getFilteredProducts()

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeFilter, sortOption])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              } else {
                // Sale ended
                clearInterval(timer)
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page">
      <div className="page-header sales-header">
        <h1>Clearance Sale</h1>
        <div className="sale-countdown">
          <p>Sale Ends In:</p>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="count">{countdown.days}</span>
              <span className="label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="count">{countdown.hours.toString().padStart(2, "0")}</span>
              <span className="label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="count">{countdown.minutes.toString().padStart(2, "0")}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="count">{countdown.seconds.toString().padStart(2, "0")}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
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

          <button className="filter-toggle-btn" onClick={toggleFilters}>
            <Filter size={18} />
            <span>Sort</span>
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {showFilters && (
          <div className="product-filters">
            <div className="filter-group">
              <label htmlFor="sortOption">Sort By:</label>
              <select
                id="sortOption"
                name="sortOption"
                value={sortOption}
                onChange={handleSortChange}
                className="filter-select"
              >
                <option value="discount">Biggest Discount</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        <section className="sale-products-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No sale products found</h3>
              <p>Try selecting a different category or check back soon for new sales.</p>
              <button className="cta-button" onClick={() => setActiveFilter("all")}>
                View All Sale Products
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card sale-card" key={product.id}>
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} />
                      <span className="sale-badge">-{product.discount}</span>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="price-container">
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          )}
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
