"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ShoppingCart, Heart, ArrowLeft, Check, AlertCircle } from 'lucide-react'
import "./pages.css"
import "./product-detail.css"
import { getProductById } from "../services/api/product"

export default function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(productId)
        if (data) {
          setProduct(data)
          // Set default selections if available
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0])
          }
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0])
          }
        } else {
          setError("Product not found")
        }
      } catch (err) {
        setError("Failed to load product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    // Here you would add the product to cart with selected options
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    }
    
    console.log("Adding to cart:", productToAdd)
    // In a real app, you would dispatch this to your cart state/context
    alert("Product added to cart!")
  }

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product._id)
    // In a real app, you would dispatch this to your wishlist state/context
    alert("Product added to wishlist!")
  }

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-container">
            <AlertCircle size={48} className="error-icon" />
            <h2>Error Loading Product</h2>
            <p>{error}</p>
            <Link to="/" className="cta-button">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-container">
            <AlertCircle size={48} className="error-icon" />
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="cta-button">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate sale price if applicable
  const salePrice = product.sale?.live
    ? product.sale.discountPercentage
      ? product.price - (product.price * product.sale.discountPercentage) / 100
      : product.price - (product.sale.discountAmount || 0)
    : null

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail-container">
          <div className="product-navigation">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              <span>Back to Products</span>
            </Link>
          </div>

          <div className="product-detail-content">
            <div className="product-detail-image">
              <img
                src={product.image || "https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png"}
                alt={product.name}
              />
              {product.sale?.live && <span className="product-detail-badge">Sale</span>}
            </div>

            <div className="product-detail-info">
              <div className="product-detail-header">
                <h1 className="product-detail-title">{product.name}</h1>
                <div className="product-detail-category">
                  <span>{product.category?.name || "Uncategorized"}</span>
                  {product.gender && product.gender !== "both" && (
                    <span className="product-gender">
                      {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
                    </span>
                  )}
                </div>
              </div>

              <div className="product-detail-price">
                {salePrice ? (
                  <>
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="sale-price">${salePrice.toFixed(2)}</span>
                    <span className="discount-badge">
                      {product.sale.discountPercentage
                        ? `-${product.sale.discountPercentage}%`
                        : `-$${product.sale.discountAmount}`}
                    </span>
                  </>
                ) : (
                  <span className="current-price">${product.price.toFixed(2)}</span>
                )}
              </div>

              <div className="product-detail-stock">
                <span className={`stock-status ${product.quantity > 0 ? "in-stock" : "out-of-stock"}`}>
                  {product.quantity > 0 ? (
                    <>
                      <Check size={16} /> In Stock
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
                {product.quantity > 0 && product.quantity < 10 && (
                  <span className="low-stock">Only {product.quantity} left</span>
                )}
              </div>

              {product?.productType === "wear" && (
                <>
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="product-detail-options">
                      <h3>Size</h3>
                      <div className="size-options">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className={`size-option ${selectedSize === size ? "selected" : ""}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product?.wearType && (
                    <div className="product-detail-type">
                      <span>Type: {product?.wearType?.charAt(0).toUpperCase() + product?.wearType?.slice(1)}</span>
                    </div>
                  )}
                </>
              )}


              <div className="product-detail-quantity">
                <h3>Quantity</h3>
                <div className="quantity-selector">
                  <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={increaseQuantity} disabled={quantity >= product.quantity}>
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
                <button className="wishlist-btn" onClick={handleAddToWishlist}>
                  <Heart size={18} />
                  <span>Add to Wishlist</span>
                </button>
              </div>

              <div className="product-detail-meta">
                <div className="product-meta-item">
                  <span className="meta-label">Product Type:</span>
                  <span className="meta-value">
                    {product?.productType?.charAt(0)?.toUpperCase() + product?.productType?.slice(1)}
                  </span>
                </div>
                {product.gender && (
                  <div className="product-meta-item">
                    <span className="meta-label">Gender:</span>
                    <span className="meta-value">
                      {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
