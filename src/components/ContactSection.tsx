"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "777 Paradise Beach Road, Tropical Island",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 777-LUCK",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@7luckhotel.com",
    },
    {
      icon: Clock,
      title: "Reception Hours",
      content: "24/7 Available",
    },
  ];

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#f8f8f8" }}
      className="py-20"
      ref={ref}
      suppressHydrationWarning={true}
    >
      <div
        className="container mx-auto px-4 lg:px-8"
        suppressHydrationWarning={true}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          suppressHydrationWarning={true}
        >
          <h2
            style={{ color: "#003366" }}
            className="font-playfair text-4xl md:text-5xl mb-4"
          >
            Get in Touch
          </h2>
          <div
            style={{ backgroundColor: "#d4af37" }}
            className="w-20 h-1 mx-auto mb-6"
          ></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Ready to experience luxury? Contact us today to book your perfect
            getaway.
          </p>
        </motion.div>

        <div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          suppressHydrationWarning={true}
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            suppressHydrationWarning={true}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
              suppressHydrationWarning={true}
            >
              <div className="mb-6" suppressHydrationWarning={true}>
                <label
                  htmlFor="name"
                  style={{ color: "#003366" }}
                  className="block mb-2"
                  suppressHydrationWarning={true}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="John Doe"
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="mb-6" suppressHydrationWarning={true}>
                <label
                  htmlFor="email"
                  style={{ color: "#003366" }}
                  className="block mb-2"
                  suppressHydrationWarning={true}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="john@example.com"
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="mb-6" suppressHydrationWarning={true}>
                <label
                  htmlFor="phone"
                  style={{ color: "#003366" }}
                  className="block mb-2"
                  suppressHydrationWarning={true}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="+1 (555) 000-0000"
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="mb-6" suppressHydrationWarning={true}>
                <label
                  htmlFor="message"
                  style={{ color: "#003366" }}
                  className="block mb-2"
                  suppressHydrationWarning={true}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                  placeholder="Tell us about your stay preferences..."
                  suppressHydrationWarning={true}
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: "#d4af37", color: "#003366" }}
                className="w-full py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl"
                suppressHydrationWarning={true}
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            suppressHydrationWarning={true}
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md"
                  suppressHydrationWarning={true}
                >
                  <div
                    style={{ backgroundColor: "#003366" }}
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    suppressHydrationWarning={true}
                  >
                    <info.icon
                      style={{ color: "#d4af37" }}
                      className="w-6 h-6"
                    />
                  </div>
                  <div suppressHydrationWarning={true}>
                    <h3 style={{ color: "#003366" }} className="mb-1">
                      {info.title}
                    </h3>
                    <p className="text-foreground/70">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-lg overflow-hidden shadow-lg h-64"
              suppressHydrationWarning={true}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                suppressHydrationWarning={true}
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
