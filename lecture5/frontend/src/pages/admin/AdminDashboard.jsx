import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Edit, Trash2, Plus, Tag, Package, Component } from "lucide-react"
import "../pages.css"
import "./admin.css"
import { useSelector } from "react-redux"
import { createCategory, getAllProducts } from "../../services/api/product"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    productType: "wear",
    sizes: [],
    colors: [],
    gender: "both",
    wearType: "",
    image: "",
    sale: {
      live: false,
      discountPercentage: "",
      discountAmount: "",
    },
  })
  const [editingProduct, setEditingProduct] = useState(null)
  const [categories, setCategories] = useState([
    { _id: "1", name: "Running" },
    { _id: "2", name: "Basketball" },
    { _id: "3", name: "Football" },
    { _id: "4", name: "Tennis" },
    { _id: "5", name: "Golf" },
  ]);
  const [category,setCategory] = useState("");

  const user = useSelector((state) => state.userData.value)
  const navigate = useNavigate()

  // Available options based on schema
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
  const colorOptions = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "cyan",
    "magenta",
  ]
  const productTypes = ["wear", "playable", "equipment"]
  const genderOptions = ["male", "female", "both"]
  const wearTypes = ["bottom", "top"]

  useEffect(() => {
    // Check if user is admin, if not redirect
    if (user && user.role !== "admin") {
      navigate("/")
    }

    fetchProducts()
  }, [user, navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("sale.")) {
      const saleField = name.split(".")[1]
      setFormData({
        ...formData,
        sale: {
          ...formData.sale,
          [saleField]: saleField === "live" ? e.target.checked : value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleMultiSelectChange = (e, field) => {
    const options = Array.from(e.target.selectedOptions).map((option) => option.value)
    setFormData({
      ...formData,
      [field]: options,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Here you would call your API to create or update a product
      console.log("Submitting product:", formData)

      // If editing, update the product
      if (editingProduct) {
        // Call update API
        console.log("Updating product:", editingProduct._id)
        // After successful update
        setEditingProduct(null)
      } else {
        // Call create API
        console.log("Creating new product")
      }

      // Reset form and refresh products
      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: "",
        productType: "wear",
        sizes: [],
        colors: [],
        gender: "both",
        wearType: "",
        image: "",
        sale: {
          live: false,
          discountPercentage: "",
          discountAmount: "",
        },
      })

      fetchProducts()
      setActiveTab("products")
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || "",
      price: product.price || "",
      quantity: product.quantity || "",
      category: product.category?._id || "",
      productType: product.productType || "wear",
      sizes: product.sizes || [],
      colors: product.colors || [],
      gender: product.gender || "both",
      wearType: product.wearType || "",
      image: product.image || "",
      sale: {
        live: product.sale?.live || false,
        discountPercentage: product.sale?.discountPercentage || "",
        discountAmount: product.sale?.discountAmount || "",
      },
    })
    setActiveTab("addProduct")
  }

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Call delete API
        console.log("Deleting product:", productId)
        // After successful delete
        fetchProducts()
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const toggleSale = async (product) => {
    try {
      const updatedSaleStatus = !product.sale?.live
      console.log(`Setting sale status to ${updatedSaleStatus} for product:`, product._id)

      // Call API to update sale status
      // After successful update
      fetchProducts()
    } catch (error) {
      console.error("Error updating sale status:", error)
    }
  }

  const handleCategoryChange = (e)=>{
    setCategory(e.target.value);
  }

  const handleCategorySubmit = async (e)=>{
    e.preventDefault();
    const name = await createCategory(category);
  }

  return (
    <div className="page">
      <div className="page-header admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="container">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} />
            Products
          </button>
          <button
            className={`admin-tab ${activeTab === "addProduct" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("addProduct")
              setEditingProduct(null)
              setFormData({
                name: "",
                price: "",
                quantity: "",
                category: "",
                productType: "wear",
                sizes: [],
                colors: [],
                gender: "both",
                wearType: "",
                image: "",
                sale: {
                  live: false,
                  discountPercentage: "",
                  discountAmount: "",
                },
              })
            }}
          >
            <Plus size={18} />
            {editingProduct ? "Edit Product" : "Add Product"}
          </button>
          <button
            className={`admin-tab ${activeTab === "category" ? "active" : ""}`}
            onClick={() => setActiveTab("category")}
          >
            <Component size={18} />
              Category
          </button>
        </div>

        {activeTab === "products" && (
          <div className="admin-content">
            <div className="admin-header-actions">
              <h2>Product Management</h2>
              <button className="cta-button" onClick={() => setActiveTab("addProduct")}>
                <Plus size={18} />
                Add New Product
              </button>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Start by adding your first product</p>
                <button className="cta-button" onClick={() => setActiveTab("addProduct")}>
                  Add Product
                </button>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Category</th>
                      <th>Sale</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            src={
                              product.image ||
                              "https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png"
                            }
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price?.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category?.name || "Uncategorized"}</td>
                        <td>
                          <div className="sale-toggle">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={product.sale?.live || false}
                                onChange={() => toggleSale(product)}
                              />
                              <span className="slider round"></span>
                            </label>
                            <span>{product.sale?.live ? "Active" : "Inactive"}</span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-button edit" onClick={() => handleEdit(product)}>
                              <Edit size={16} />
                            </button>
                            <button className="action-button delete" onClick={() => handleDelete(product._id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "addProduct" && (
          <div className="admin-content">
            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Product Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price*</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity*</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productType">Product Type*</label>
                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.productType === "wear" && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="wearType">Wear Type</label>
                    <select
                      id="wearType"
                      name="wearType"
                      value={formData.wearType}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select Wear Type</option>
                      {wearTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sizes">Sizes</label>
                    <select
                      id="sizes"
                      name="sizes"
                      multiple
                      value={formData.sizes}
                      onChange={(e) => handleMultiSelectChange(e, "sizes")}
                      className="form-input multi-select"
                    >
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <small>Hold Ctrl/Cmd to select multiple</small>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="colors">Colors</label>
                  <select
                    id="colors"
                    name="colors"
                    multiple
                    value={formData.colors}
                    onChange={(e) => handleMultiSelectChange(e, "colors")}
                    className="form-input multi-select"
                  >
                    {colorOptions.map((color) => (
                      <option
                        key={color}
                        value={color}
                        style={{
                          backgroundColor: color,
                          color: ["white", "yellow", "cyan"].includes(color) ? "black" : "white",
                        }}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </select>
                  <small>Hold Ctrl/Cmd to select multiple</small>
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <Tag size={18} />
                  Sale Information
                </h3>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="sale.live"
                        checked={formData.sale.live}
                        onChange={handleInputChange}
                      />
                      Active Sale
                    </label>
                  </div>
                </div>

                {formData.sale.live && (
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="discountPercentage">Discount Percentage (%)</label>
                      <input
                        type="number"
                        id="discountPercentage"
                        name="sale.discountPercentage"
                        value={formData.sale.discountPercentage}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="discountAmount">Discount Amount ($)</label>
                      <input
                        type="number"
                        id="discountAmount"
                        name="sale.discountAmount"
                        value={formData.sale.discountAmount}
                        onChange={handleInputChange}
                        min="0"
                        className="form-input"
                      />
                      <small>Use either percentage or fixed amount</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="cta-button">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setActiveTab("products")
                    setEditingProduct(null)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "category" && (
          <div className="admin-content">
            <form className="admin-form" onSubmit={handleCategorySubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Category Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleCategoryChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="cta-button">
                  Add Caategory
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setActiveTab("products")
                    setEditingProduct(null)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
