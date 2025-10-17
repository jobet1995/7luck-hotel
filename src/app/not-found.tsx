"use client";

import { motion } from "motion/react";
import { Home, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-8xl md:text-9xl text-blue-900 mb-4">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-playfair text-3xl md:text-4xl text-slate-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Oops! It seems like you&apos;ve ventured off the beaten path. The
            page you&apos;re looking for doesn&apos;t exist at 7-Luck Hotel &
            Resorts.
          </p>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-blue-900 to-purple-900 mx-auto"></div>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg hover:from-purple-900 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/#about"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-blue-900 hover:text-blue-900 hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Explore Hotel</span>
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-slate-500"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-900" />
              <a
                href="tel:+15551234567"
                className="text-blue-900 hover:text-purple-900 underline transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-900" />
              <a
                href="mailto:info@7luckhotel.com"
                className="text-purple-900 hover:text-blue-900 underline transition-colors"
              >
                info@7luckhotel.com
              </a>
            </div>
          </div>

          <p className="mt-4">
            Lost your way? Our concierge team is here to help 24/7.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
