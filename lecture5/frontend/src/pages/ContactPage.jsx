"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import "./pages.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }, 1500)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Our Location",
      details: ["123 Sports Avenue", "Athletic District", "New York, NY 10001"],
    },
    {
      icon: <Phone size={24} />,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <Mail size={24} />,
      title: "Email Address",
      details: ["support@sportsequipment.com", "sales@sportsequipment.com"],
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday - Sunday: 10AM - 6PM"],
    },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>

      <div className="container">
        <div className="contact-intro">
          <h2>Get In Touch</h2>
          <p>
            Have questions about our products or services? Our team is here to help. Fill out the form below or use our
            contact information to reach out to us directly.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info-section">
            {contactInfo.map((info, index) => (
              <div className="contact-card" key={index}>
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-details">
                  <h3>{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-section">
            {isSubmitted ? (
              <div className="form-success">
                <CheckCircle size={48} className="success-icon" />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    placeholder="Product Inquiry"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    placeholder="How can we help you?"
                    rows="5"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="button-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="map-section">
          <h2>Visit Our Store</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620796594975!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All
                payments are securely processed.
              </p>
            </div>
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>
                We offer a 30-day return policy for all unused items in their original packaging. Please contact our
                customer service team to initiate a return.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending
                on the destination.
              </p>
            </div>
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>
                Once your order ships, you'll receive a confirmation email with tracking information. You can also track
                your order in your account dashboard.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
