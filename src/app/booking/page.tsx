"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Users,
  CreditCard,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

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

interface BookingData {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  specialRequests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

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
    amenities: ["Free WiFi", "Room Service", "Balcony", "Mini Bar", "Smart TV"],
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
    ],
  },
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId as string;

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: null,
    checkOut: null,
    guests: 1,
    specialRequests: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [step, setStep] = useState<"details" | "payment" | "confirmation">(
    "details",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (roomId) {
      const room = rooms.find((r) => r.id === roomId);
      setSelectedRoom(room || null);
    }
  }, [roomId]);

  const handleInputChange = (
    field: keyof BookingData,
    value: string | number | Date | null,
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepChange = (
    newStep: "details" | "payment" | "confirmation",
  ) => {
    setStep(newStep);
    // Scroll to top when changing steps, especially when going back from payment
    if (newStep === "details" && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatCreditCard = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diffTime = Math.abs(
      bookingData.checkOut.getTime() - bookingData.checkIn.getTime(),
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = selectedRoom ? selectedRoom.price * nights : 0;
    const taxes = subtotal * 0.12; // 12% taxes
    const fees = 25; // Service fee
    return subtotal + taxes + fees;
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStep("confirmation");
    setIsProcessing(false);
  };

  if (!selectedRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Room Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-playfair text-slate-800 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-slate-600 mb-6">
              Thank you for choosing 7Luck Hotel. Your reservation has been
              confirmed.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-slate-800 mb-2">
                Booking Details
              </h3>
              <p className="text-sm text-slate-600">
                <strong>Room:</strong> {selectedRoom.name}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Check-in:</strong>{" "}
                {bookingData.checkIn?.toLocaleDateString()}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Check-out:</strong>{" "}
                {bookingData.checkOut?.toLocaleDateString()}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Guests:</strong> {bookingData.guests}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Total:</strong> ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </button>
          <h1 className="text-4xl font-playfair text-slate-800 mb-2">
            Book {selectedRoom.name}
          </h1>
          <p className="text-slate-600">
            Complete your booking for this luxurious accommodation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Room Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.name}
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-playfair text-slate-800 mb-2">
                {selectedRoom.name}
              </h2>
              <p className="text-slate-600 mb-4">{selectedRoom.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-slate-300 rounded"></span>
                  <span className="text-sm text-slate-600">
                    {selectedRoom.size}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-900" />
                  <span className="text-sm text-slate-600">
                    Up to {selectedRoom.capacity} guests
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-slate-300 rounded"></span>
                  <span className="text-sm text-slate-600">
                    {selectedRoom.bedType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-slate-300 rounded"></span>
                  <span className="text-sm text-slate-600">
                    {selectedRoom.view} view
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue-900">
                  ${selectedRoom.price}
                </span>
                <span className="text-slate-500">/night</span>
                {selectedRoom.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ${selectedRoom.originalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-800">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-playfair text-slate-800 mb-6">
              {step === "details" ? "Booking Details" : "Payment Information"}
            </h2>

            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {step === "details" ? (
                <>
                  {/* Calendar Date Pickers */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                        <input
                          type="date"
                          value={
                            bookingData.checkIn
                              ? bookingData.checkIn.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "checkIn",
                              e.target.value ? new Date(e.target.value) : null,
                            )
                          }
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                        <input
                          type="date"
                          value={
                            bookingData.checkOut
                              ? bookingData.checkOut.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "checkOut",
                              e.target.value ? new Date(e.target.value) : null,
                            )
                          }
                          min={
                            bookingData.checkIn
                              ? bookingData.checkIn.toISOString().split("T")[0]
                              : new Date().toISOString().split("T")[0]
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={bookingData.guests}
                        onChange={(e) =>
                          handleInputChange("guests", parseInt(e.target.value))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      >
                        {Array.from(
                          { length: selectedRoom.capacity },
                          (_, i) => i + 1,
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        handleInputChange("specialRequests", e.target.value)
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 resize-none"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>

                  {/* Booking Summary */}
                  {bookingData.checkIn && bookingData.checkOut && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-800 mb-2">
                        Booking Summary
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>{selectedRoom.name}</span>
                          <span>${selectedRoom.price}/night</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{calculateNights()} nights</span>
                          <span>
                            $
                            {(selectedRoom.price * calculateNights()).toFixed(
                              2,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes & Fees</span>
                          <span>
                            $
                            {(
                              selectedRoom.price * calculateNights() * 0.12 +
                              25
                            ).toFixed(2)}
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  {/* Credit Card Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            formatCreditCard(e.target.value),
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.cardName}
                          onChange={(e) =>
                            handleInputChange("cardName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {step === "payment" && (
                  <button
                    type="button"
                    onClick={() => handleStepChange("details")}
                    className="flex-1 bg-gray-200 text-slate-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={
                    isProcessing ||
                    (step === "details" &&
                      (!bookingData.checkIn || !bookingData.checkOut))
                  }
                  className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isProcessing
                    ? "Processing..."
                    : step === "details"
                      ? "Continue to Payment"
                      : "Confirm Booking"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
