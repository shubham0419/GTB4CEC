"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, Menu, X, User, Heart, LogOut } from "lucide-react"
import Cookies from "js-cookie";
import "./Navbar.css"
import { logoutUser } from "../services/api/auth";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(2)
  const [wishlistCount, setWishlistCount] = useState(3)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const user = useSelector(state=>state.userData.value) ?? null;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown)
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
    // Navigate to search results page
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleLogout = async () => {
    logoutUser()
    navigate("/login");
    setShowUserDropdown(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(".user-dropdown-container")) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserDropdown])

  return (
    <nav className="navbar">
      {/* Desktop Navigation */}
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-text">
              SPORT<span className="logo-accent">HUB</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <div
              className="category-dropdown"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
              <div className={`dropdown-content ${showCategoryDropdown ? "show" : ""}`}>
                <Link to="#" className="dropdown-item">
                  Running
                </Link>
                <Link to="#" className="dropdown-item">
                  Basketball
                </Link>
                <Link to="#" className="dropdown-item">
                  Football
                </Link>
                <Link to="#" className="dropdown-item">
                  Tennis
                </Link>
                <Link to="#" className="dropdown-item">
                  Golf
                </Link>
              </div>
            </div>
            <Link to="/new-arrivals" className="nav-link">
              New Arrivals
            </Link>
            <Link to="/sales" className="nav-link">
              Sales
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* Search, User, Wishlist, Cart - Desktop */}
          <div className="navbar-actions">
            {/* Search */}
            <form className="search-container" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" />
            </form>

            {/* User Account */}
            <div className="user-dropdown-container">
              <button onClick={toggleUserDropdown} className="action-icon">
                <User />
              </button>
              {showUserDropdown && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <div className="user-info">
                        <span className="user-name">{user.name || user.email}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      {/* <Link to="/profile" className="dropdown-item">
                        My Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item">
                        My Orders
                      </Link> */}
                      <button onClick={handleLogout} className="dropdown-item logout-item">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item">
                        Sign In
                      </Link>
                      <Link to="/signup" className="dropdown-item">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="action-icon">
              <Heart />
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="action-icon cart-icon">
              <ShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/categories" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
          <Link to="/new-arrivals" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            New Arrivals
          </Link>
          <Link to="/sales" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Sales
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>

        <div className="mobile-nav-actions">
          <form className="mobile-search" onSubmit={handleSearch}>
            <Search className="mobile-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="mobile-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="mobile-user-actions">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span>Hello, {user.name || user.email.split("@")[0]}</span>
                </div>
                <div className="mobile-action-buttons">
                  {/* <Link to="/profile" className="mobile-action-link" onClick={() => setIsMenuOpen(false)}>
                    <User />
                    <span>Profile</span>
                  </Link> */}
                  <Link to="/wishlist" className="mobile-action-link" onClick={() => setIsMenuOpen(false)}>
                    <Heart />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link to="/cart" className="mobile-action-link" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart />
                    <span>Cart ({cartCount})</span>
                  </Link>
                  <button onClick={handleLogout} className="mobile-action-link logout-button">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-auth-button" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="mobile-auth-button signup" onClick={() => setIsMenuOpen(false)}>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
