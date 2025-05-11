"use client"

import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import CategoriesPage from "./pages/Categories"
import NewArrivalsPage from "./pages/NewArrivalsPage"
import SalesPage from "./pages/SalesPage"
import ContactPage from "./pages/ContactPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishListPage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import AdminSignupPage from "./pages/auth/AdminSignup"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ProductDetailPage from "./pages/ProductDetailPage"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "./services/api/auth"
import { setUserData } from "./redux/features/userSlice"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const user = await getCurrentUser()
    dispatch(setUserData(user))
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/signup" element={<AdminSignupPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Product Detail Route */}
        <Route
          path="/product/:productId"
          element={
            <>
              <Navbar />
              <ProductDetailPage />
            </>
          }
        />

        {/* Routes with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <Navbar />
              <CategoriesPage />
            </>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <>
              <Navbar />
              <NewArrivalsPage />
            </>
          }
        />
        <Route
          path="/sales"
          element={
            <>
              <Navbar />
              <SalesPage />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
            </>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <CartPage />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <Navbar />
              <WishlistPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
