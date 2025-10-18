"use client";

import { motion } from "motion/react";
import { Maximize2, Users, Star } from "lucide-react";
import Image from "next/image";
import Modal from "./Modal";

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

interface AllRoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onViewRoomDetails: (room: Room) => void;
}

export default function AllRoomsModal({
  isOpen,
  onClose,
  rooms,
  onViewRoomDetails,
}: AllRoomsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="All Our Luxurious Rooms"
      size="full"
    >
      <div className="space-y-6">
        <p className="text-slate-600 text-center max-w-2xl mx-auto">
          Discover our complete collection of luxurious accommodations, each
          designed to provide the perfect blend of comfort, elegance, and modern
          luxury.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  quality={85}
                />
                <div
                  style={{ backgroundColor: "#d4af37" }}
                  className="absolute top-3 right-3 px-2 py-1 rounded-full flex items-center gap-1 text-xs"
                >
                  <Star
                    style={{ color: "#003366", fill: "#003366" }}
                    className="w-3 h-3"
                  />
                  <span style={{ color: "#003366" }}>{room.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3
                  style={{ color: "#003366" }}
                  className="text-lg font-semibold mb-2"
                >
                  {room.name}
                </h3>
                <p className="text-slate-600 text-sm mb-3 h-10 overflow-hidden">
                  {room.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Maximize2
                      style={{ color: "#d4af37" }}
                      className="w-3 h-3"
                    />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users style={{ color: "#d4af37" }} className="w-3 h-3" />
                    <span>{room.guests} guests</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-900">
                      ${room.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${room.originalPrice}
                    </span>
                  </div>
                  <span className="text-slate-500 text-sm">/night</span>
                </div>

                <button
                  onClick={() => {
                    onViewRoomDetails(room);
                    onClose();
                  }}
                  style={{ backgroundColor: "#003366", color: "#f8f8f8" }}
                  className="w-full mt-3 py-2 rounded hover:opacity-90 transition-all duration-300 text-sm"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
