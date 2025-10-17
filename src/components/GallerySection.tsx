"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import ImageGalleryModal from "./ImageGalleryModal";

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1667842288007-ea49b67ce9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Resort Exterior",
    },
    {
      url: "https://images.unsplash.com/photo-1737807478491-6e258b44bd04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc2MDY4ODYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Luxury Interior",
    },
    {
      url: "https://images.unsplash.com/photo-1697216563517-e48622ba218c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzYwNjgzNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Pool Area",
    },
    {
      url: "https://images.unsplash.com/photo-1646598446711-e320fe4af62e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBiZWFjaCUyMHZpZXd8ZW58MXx8fHwxNzYwNzAwMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Beach View",
    },
    {
      url: "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Suite Bedroom",
    },
    {
      url: "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Private Villa",
    },
  ];

  const imageUrls = galleryImages.map((img) => img.url);

  return (
    <section id="gallery" className="py-20 bg-white" ref={ref}>
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
            Gallery
          </h2>
          <div
            style={{ backgroundColor: "#d4af37" }}
            className="w-20 h-1 mx-auto mb-6"
          ></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore the beauty and elegance of 7-Luck Hotel & Resorts through
            our curated gallery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer h-80"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={400}
                height={320}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-xl font-playfair">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={imageUrls}
        currentIndex={selectedImageIndex || 0}
        title="Hotel Gallery"
      />
    </section>
  );
}
