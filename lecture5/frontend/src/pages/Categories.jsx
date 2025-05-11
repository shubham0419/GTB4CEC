"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import "./pages.css"
import { getAllProducts } from "../services/api/product"

export default function CategoriesPage() {
  const categories = [
    {
      id: "running",
      name: "Running",
      image:
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "basketball",
      name: "Basketball",
      image:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "football",
      name: "Football",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "tennis",
      name: "Tennis",
      image:
        "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "golf",
      name: "Golf",
      image:
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: "all",
    sortBy: "featured",
  })

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory)
    }
  }, [selectedCategory, filters])

  const fetchProductsByCategory = async (categoryId) => {
    setLoading(true)
    try {
      // In a real app, you would filter by category ID
      // For now, we'll just fetch all products and filter on the client
      const allProducts = await getAllProducts()

      // Simulate filtering by category (replace with actual filtering logic)
      let filteredProducts = allProducts.filter((product) => product.category?.name?.toLowerCase() === categoryId)

      // Apply price filter
      if (filters.priceRange !== "all") {
        filteredProducts = applyPriceFilter(filteredProducts, filters.priceRange)
      }

      // Apply sorting
      filteredProducts = applySorting(filteredProducts, filters.sortBy)

      setProducts(filteredProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const applyPriceFilter = (products, range) => {
    switch (range) {
      case "under50":
        return products.filter((p) => p.price < 50)
      case "50to100":
        return products.filter((p) => p.price >= 50 && p.price <= 100)
      case "100to200":
        return products.filter((p) => p.price > 100 && p.price <= 200)
      case "over200":
        return products.filter((p) => p.price > 200)
      default:
        return products
    }
  }

  const applySorting = (products, sortBy) => {
    switch (sortBy) {
      case "priceLow":
        return [...products].sort((a, b) => a.price - b.price)
      case "priceHigh":
        return [...products].sort((a, b) => b.price - a.price)
      case "newest":
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      default:
        // Featured - no specific sorting
        return products
    }
  }

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

  return (
    <div className="page">
      <div className="page-header">
        <h1>Shop by Category</h1>
      </div>

      <div className="container">
        <div className="categories-showcase">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card-large ${selectedCategory === category.id ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="category-image-container">
                <img src={category.image || "/placeholder.svg"} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                  <span className="category-cta">Browse Products</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="category-products-section">
            <div className="category-products-header">
              <h2>{categories.find((c) => c.id === selectedCategory)?.name} Products</h2>
              <button className="filter-toggle-btn" onClick={toggleFilters}>
                <Filter size={18} />
                <span>Filters</span>
                {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            {showFilters && (
              <div className="product-filters">
                <div className="filter-group">
                  <label htmlFor="priceRange">Price Range:</label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                    className="filter-select"
                  >
                    <option value="all">All Prices</option>
                    <option value="under50">Under $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="100to200">$100 - $200</option>
                    <option value="over200">Over $200</option>
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
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            )}

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>We couldn't find any products in this category matching your filters.</p>
                <button className="cta-button" onClick={() => setFilters({ priceRange: "all", sortBy: "featured" })}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
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
          </div>
        )}

        {!selectedCategory && (
          <div className="category-prompt">
            <h2>Select a category to view products</h2>
            <p>Browse our collection by selecting one of the categories above</p>
          </div>
        )}
      </div>
    </div>
  )
}
