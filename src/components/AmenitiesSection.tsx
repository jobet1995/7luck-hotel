"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Wifi,
  Car,
  Coffee,
  Wind,
} from "lucide-react";

export default function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const amenities = [
    {
      icon: Waves,
      title: "Infinity Pool",
      description: "Stunning ocean-view pool with poolside bar",
    },
    {
      icon: Sparkles,
      title: "Luxury Spa",
      description: "Full-service spa with exotic treatments",
    },
    {
      icon: UtensilsCrossed,
      title: "Fine Dining",
      description: "Gourmet restaurants with world cuisine",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "State-of-the-art gym equipment",
    },
    {
      icon: Waves,
      title: "Beach Access",
      description: "Private white sand beach",
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet throughout",
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "Complimentary parking service",
    },
    {
      icon: Wind,
      title: "Climate Control",
      description: "Perfect temperature all year",
    },
  ];

  return (
    <section
      id="amenities"
      style={{ backgroundColor: "#f8f8f8" }}
      className="py-20"
      ref={ref}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            style={{ color: "#003366" }}
            className="font-playfair text-4xl md:text-5xl mb-4"
          >
            World-Class Amenities
          </h2>
          <div
            style={{ backgroundColor: "#d4af37" }}
            className="w-20 h-1 mx-auto mb-6"
          ></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Indulge in our carefully curated selection of premium amenities
            designed for your ultimate comfort and relaxation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group text-center"
            >
              <div
                style={{ backgroundColor: "#003366" }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d4af37] transition-colors duration-300"
              >
                <amenity.icon
                  style={{ color: "#d4af37" }}
                  className="w-8 h-8 group-hover:text-[#003366] transition-colors duration-300"
                />
              </div>
              <h3
                style={{ color: "#003366" }}
                className="mb-2 group-hover:text-[#d4af37] transition-colors duration-300"
              >
                {amenity.title}
              </h3>
              <p className="text-foreground/70 text-sm">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Images */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative overflow-hidden rounded-lg shadow-xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1697216563517-e48622ba218c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzYwNjgzNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Resort Pool"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white text-2xl font-playfair mb-2">
                  Infinity Pool Paradise
                </h3>
                <p className="text-white/90">
                  Relax by our stunning tropical pools
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative overflow-hidden rounded-lg shadow-xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1646598446711-e320fe4af62e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBiZWFjaCUyMHZpZXd8ZW58MXx8fHwxNzYwNzAwMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Beach View"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white text-2xl font-playfair mb-2">
                  Private Beach Access
                </h3>
                <p className="text-white/90">Steps away from pristine shores</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
