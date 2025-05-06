import { useEffect, useState } from "react";
import "./pages.css";
import { getAllProducts } from "../services/api/product";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async() => {
    try {
      let products = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
          ) : allProducts.length === 0 ? (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Check back soon for our latest products!</p>
            </div>
          ) : (
            <div className="product-grid">
              {allProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image">
                    <img 
                      src={product.image || "/api/placeholder/250/220"} 
                      alt={product.name} 
                    />
                    {/* {product.isNew && <span className="product-badge">New</span>} */}
                    {product.sale.live && <span className="sale-badge">Sale</span>}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="price-container">
                      {product.sale.live ? (
                        <>
                          <span className="original-price">${product.price.toFixed(2)}</span>
                          <span className="sale-price">${(product.price - (product.sale.discountPercentage?(product.sale.discountPercentag*product.pricee/100):product.sale.discountAmount)).toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="product-price">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="add-to-cart">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="categories-section">
          <h2>Shop By Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Running" />
              <h3>Running</h3>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Basketball" />
              <h3>Basketball</h3>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=3149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Football" />
              <h3>Football</h3>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D" alt="Tennis" />
              <h3>Tennis</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}