"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Maximize2, Users, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AllRoomsModal from "./AllRoomsModal";
import RoomDetailsModal from "./RoomDetailsModal";

interface Room {
  id: string;
  name: string;
  image: string;
  description: string;
  size: string;
  capacity: number;
  guests: string;
  rating: number;
  bedType: string;
  view: string;
  price: number;
  originalPrice?: number;
  amenities: string[];
  images: string[];
}

export default function RoomsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isAllRoomsModalOpen, setIsAllRoomsModalOpen] = useState(false);
  const router = useRouter();

  const rooms: Room[] = [
    {
      id: "deluxe-suite",
      name: "Deluxe Suite",
      image:
        "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Spacious luxury suite with ocean view and modern amenities",
      size: "45m²",
      capacity: 3,
      guests: "2-3",
      rating: 4.9,
      bedType: "King Bed",
      view: "Ocean",
      price: 299,
      originalPrice: 399,
      amenities: [
        "Free WiFi",
        "Room Service",
        "Balcony",
        "Mini Bar",
        "Smart TV",
      ],
      images: [
        "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb218ZW58MXx8fHwxNzYwNjI4NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnRpYWwlMjBzdWl0ZSUyMGhvdGVsfGVufDF8fHx8MTc2MDY3MzU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
    {
      id: "premium-ocean",
      name: "Premium Ocean View",
      image:
        "https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb218ZW58MXx8fHwxNzYwNjI4NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Breathtaking views with premium furnishings and balcony",
      size: "38m²",
      capacity: 2,
      guests: "2",
      rating: 4.8,
      bedType: "Queen Bed",
      view: "Ocean",
      price: 249,
      originalPrice: 329,
      amenities: ["Free WiFi", "Balcony", "Coffee Machine", "Smart TV", "Safe"],
      images: [
        "https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb218ZW58MXx8fHwxNzYwNjI4NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
    {
      id: "royal-villa",
      name: "Royal Villa",
      image:
        "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Private villa with pool, garden, and exclusive services",
      size: "85m²",
      capacity: 6,
      guests: "4-6",
      rating: 5.0,
      bedType: "King Bed + Sofa Bed",
      view: "Garden",
      price: 599,
      originalPrice: 799,
      amenities: [
        "Private Pool",
        "Garden",
        "Butler Service",
        "Free WiFi",
        "Parking",
        "Fitness Center",
      ],
      images: [
        "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb218ZW58MXx8fHwxNzYwNjI4NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnRpYWwlMjBzdWl0ZSUyMGhvdGVsfGVufDF8fHx8MTc2MDY3MzU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      image:
        "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnRpYWwlMjBzdWl0ZSUyMGhvdGVsfGVufDF8fHx8MTc2MDY3MzU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Ultimate luxury with panoramic views and VIP treatment",
      size: "120m²",
      capacity: 8,
      guests: "4-8",
      rating: 5.0,
      bedType: "King Bed + 2 Queen Beds",
      view: "Panoramic",
      price: 899,
      originalPrice: 1199,
      amenities: [
        "Private Pool",
        "Butler Service",
        "VIP Lounge Access",
        "Free WiFi",
        "Parking",
        "Fitness Center",
        "Spa Access",
      ],
      images: [
        "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnRpYWwlMjBzdWl0ZSUyMGhvdGVsfGVufDF8fHx8MTc2MDY3MzU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjA2MzE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1729605411476-defbdab14c54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHJvb218ZW58MXx8fHwxNzYwNjI4NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHJlc29ydHxlbnwxfHx8fDE3NjA3MDAyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
  ];

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <>
      <section id="rooms" className="py-20 bg-white" ref={ref}>
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
              Our Luxurious Rooms
            </h2>
            <div
              style={{ backgroundColor: "#d4af37" }}
              className="w-20 h-1 mx-auto mb-6"
            ></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Each room is thoughtfully designed to provide the perfect blend of
              comfort, elegance, and modern luxury.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                  />
                  <div
                    style={{ backgroundColor: "#d4af37" }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Star
                      style={{ color: "#003366", fill: "#003366" }}
                      className="w-4 h-4"
                    />
                    <span style={{ color: "#003366" }}>{room.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 style={{ color: "#003366" }} className="text-xl mb-2">
                    {room.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Maximize2
                        style={{ color: "#d4af37" }}
                        className="w-4 h-4"
                      />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users style={{ color: "#d4af37" }} className="w-4 h-4" />
                      <span>{room.guests} guests</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(room)}
                    style={{ backgroundColor: "#003366", color: "#f8f8f8" }}
                    className="w-full py-2.5 rounded hover:opacity-90 transition-all duration-300 group-hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                setIsAllRoomsModalOpen(true);
                router.push("/rooms");
              }}
              style={{ backgroundColor: "#d4af37", color: "#003366" }}
              className="px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl"
            >
              Explore All Rooms
            </button>
          </motion.div>
        </div>

        {/* All Rooms Modal */}
        <AllRoomsModal
          isOpen={isAllRoomsModalOpen}
          onClose={() => setIsAllRoomsModalOpen(false)}
          rooms={rooms}
          onViewRoomDetails={(room) => setSelectedRoom(room)}
        />
      </section>

      {/* Room Details Modal - Rendered outside main section */}
      {selectedRoom && (
        <RoomDetailsModal
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          room={selectedRoom}
        />
      )}
    </>
  );
}
