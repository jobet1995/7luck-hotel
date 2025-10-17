"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Heart, Users } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Award,
      title: "Excellence",
      description: "Award-winning service and hospitality",
    },
    {
      icon: Heart,
      title: "Comfort",
      description: "Your home away from home",
    },
    {
      icon: Users,
      title: "Experience",
      description: "Over 20 years of luxury hospitality",
    },
  ];

  return (
    <section
      id="about"
      style={{ backgroundColor: "#f8f8f8" }}
      className="py-20"
      ref={ref}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc2MDY4ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Luxury Hotel Interior"
              className="rounded-lg shadow-2xl"
            />
            <div
              style={{ backgroundColor: "rgba(212, 175, 55, 0.2)" }}
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg -z-10"
            ></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              style={{ color: "#003366" }}
              className="font-playfair text-4xl md:text-5xl mb-4"
            >
              Our Story
            </h2>
            <div
              style={{ backgroundColor: "#d4af37" }}
              className="w-20 h-1 mb-6"
            ></div>

            <p className="text-foreground/80 mb-6">
              Nestled in a tropical paradise, 7-Luck Hotel & Resorts has been
              the epitome of luxury and comfort for over two decades. Our
              commitment to excellence and personalized service makes every stay
              an unforgettable experience.
            </p>

            <p className="text-foreground/80 mb-8">
              From our elegantly appointed rooms to our world-class amenities,
              every detail is crafted to provide you with the ultimate
              relaxation. We believe in creating moments of serenity, joy, and
              luxury that stay with you long after you leave.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    style={{ backgroundColor: "#003366" }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <feature.icon
                      style={{ color: "#d4af37" }}
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 style={{ color: "#003366" }} className="mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
