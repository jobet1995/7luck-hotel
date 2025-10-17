"use client";

import { motion } from "motion/react";
import {
  Check,
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  LucideIcon,
} from "lucide-react";
import Modal from "./Modal";
import Image from "next/image";

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    amenities: string[];
    size: string;
    capacity: number;
    bedType: string;
    view: string;
  } | null;
}

export default function RoomDetailsModal({
  isOpen,
  onClose,
  room,
}: RoomDetailsModalProps) {
  console.log(
    "RoomDetailsModal rendered with isOpen:",
    isOpen,
    "room:",
    room?.name,
  );

  // Don't render if room is null
  if (!room) return null;

  const amenityIcons: { [key: string]: LucideIcon } = {
    "Free WiFi": Wifi,
    Parking: Car,
    "Room Service": Utensils,
    "Fitness Center": Dumbbell,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${room.name} - Luxury Suite`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          {room.images.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg ${
                index === 0 ? "row-span-2" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${room.name} view ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                quality={85}
              />
              {index === 0 && (
                <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Room Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-playfair text-slate-800 mb-2">
                {room.name}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Room Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-900" />
                <span>Up to {room.capacity} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-slate-300 rounded"></span>
                <span>{room.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-slate-300 rounded"></span>
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-slate-300 rounded"></span>
                <span>{room.view} view</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-3xl font-bold text-blue-900">
                    ${room.price}
                  </span>
                  <span className="text-slate-500">/night</span>
                </div>
                {room.originalPrice && (
                  <div className="text-lg text-slate-400 line-through">
                    ${room.originalPrice}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4">
              Amenities & Services
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {room.amenities.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity] || Check;
                return (
                  <motion.div
                    key={amenity}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <IconComponent className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <span className="text-slate-700">{amenity}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Booking Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full mt-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white py-4 rounded-lg hover:from-purple-900 hover:to-blue-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Book This Room
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
