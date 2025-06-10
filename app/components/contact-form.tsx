"use client"

import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ContactForm() {
  useEffect(() => {
    emailjs.init("yknPfLDyBmzHBnZTn")
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, error: false, success: false })

    try {
      await emailjs.send(
        "service_nbo62ge", // Replace with your EmailJS service ID
        "template_yci77o5", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: "arronlim22@gmail.com",
        },
        "yknPfLDyBmzHBnZTn" // Replace with your EmailJS public key
      )

      setStatus({ loading: false, error: false, success: true })
      setFormData({ name: "", email: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, error: false, success: false })
      }, 5000)
    } catch (error) {
      setStatus({ loading: false, error: true, success: false })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <motion.input
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Your name"
            required
            whileFocus={{ boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)" }}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <motion.input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Your email"
            required
            whileFocus={{ boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)" }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <motion.textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border rounded-md bg-background"
          placeholder="Your message"
          required
          whileFocus={{ boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)" }}
        ></motion.textarea>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          className="w-full" 
          type="submit"
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>
      {status.success && (
        <p className="text-green-500 text-sm text-center">Message sent successfully!</p>
      )}
      {status.error && (
        <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>
      )}
    </form>
  )
} 