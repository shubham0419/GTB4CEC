"use client"

import { useState } from "react"
import "./pages.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)
    setFormSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>

      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>We're here to help with any questions about our products or services.</p>

            <div className="info-item">
              <h3>Customer Support</h3>
              <p>Email: support@sporthub.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Hours: 9:00 AM - 6:00 PM, Monday to Friday</p>
            </div>

            <div className="info-item">
              <h3>Store Locations</h3>
              <div className="location-item">
                <h4>Main Store</h4>
                <p>123 Sports Avenue, Downtown</p>
                <p>Open daily: 10:00 AM - 9:00 PM</p>
              </div>
              <div className="location-item">
                <h4>Outlet Store</h4>
                <p>456 Runner's Road, East Side</p>
                <p>Open daily: 11:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  Facebook
                </a>
                <a href="#" className="social-icon">
                  Instagram
                </a>
                <a href="#" className="social-icon">
                  Twitter
                </a>
                <a href="#" className="social-icon">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            {formSubmitted ? (
              <div className="success-message">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="map-container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <img src="/api/placeholder/1200/400" alt="Store Map" className="map-image" />
          </div>
        </div>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 30-day return policy on all unused items with original packaging and receipt.</p>
            </div>
            <div className="faq-item">
              <h3>How long does shipping take?</h3>
              <p>Standard shipping takes 3-5 business days. Express shipping options are available at checkout.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>Yes, we ship to most countries worldwide. International shipping times vary by location.</p>
            </div>
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>Once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
