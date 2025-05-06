import "./pages.css"

export default function NewArrivalsPage() {
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
          <h2>Latest Products</h2>
          <div className="product-grid">
            {newArrivals.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-badge">{product.date}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">${product.price}</span>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="newsletter-section">
          <h2>Stay Updated</h2>
          <p>Sign up for our newsletter to be the first to know about new products and exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </section>
      </div>
    </div>
  )
}
