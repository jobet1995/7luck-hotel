"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X, Upload, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
interface Room {
  id?: string;
  name: string;
  type: string;
  status: string;
  price: number;
  capacity: number;
  size: string;
  floor: number;
  description: string;
  amenities: string[];
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: Room | undefined; // Room object for editing, undefined for creating
  onSave: (room: Omit<Room, "id" | "createdAt" | "updatedAt">) => void;
}

const roomTypes = [
  "Standard Room",
  "Deluxe Suite",
  "Premium Room",
  "Executive Suite",
  "Royal Villa",
  "Presidential Suite",
] as const;

const commonAmenities = [
  "Free WiFi",
  "Air Conditioning",
  "Balcony",
  "Mini Bar",
  "Smart TV",
  "Coffee Machine",
  "Safe",
  "Private Pool",
  "Garden",
  "Butler Service",
  "VIP Lounge Access",
  "Fitness Center",
  "Spa Access",
  "Parking",
] as const;

export default function RoomModal({
  isOpen,
  onClose,
  room,
  onSave,
}: RoomModalProps) {
  const [formData, setFormData] = useState({
    name: room?.name || "",
    type: room?.type || "",
    status: room?.status || "available",
    price: room?.price || "",
    capacity: room?.capacity || 2,
    size: room?.size || "",
    floor: room?.floor || 1,
    description: room?.description || "",
    amenities: room?.amenities || [],
    image: room?.image || "",
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: string,
    value: string | number | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      handleInputChange("amenities", [
        ...formData.amenities,
        newAmenity.trim(),
      ]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    handleInputChange(
      "amenities",
      formData.amenities.filter((a: string) => a !== amenity),
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Room name is required";
    if (!formData.type) newErrors.type = "Room type is required";
    if (!formData.price || parseFloat(String(formData.price)) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.size.trim()) newErrors.size = "Room size is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.capacity < 1)
      newErrors.capacity = "Capacity must be at least 1";
    if (formData.floor < 1) newErrors.floor = "Floor must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const roomData = {
        ...formData,
        price:
          typeof formData.price === "string"
            ? parseFloat(formData.price)
            : formData.price,
      };
      onSave(roomData);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange("image", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-slate-800">
              {room ? "Edit Room" : "Add New Room"}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Room Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Deluxe Suite 101"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type">Room Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger
                    className={errors.type ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600 mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price per Night ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="299.00"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <Label htmlFor="capacity">Capacity (Guests) *</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleInputChange(
                        "capacity",
                        Math.max(1, formData.capacity - 1),
                      )
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      handleInputChange(
                        "capacity",
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className={`text-center ${errors.capacity ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleInputChange("capacity", formData.capacity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {errors.capacity && (
                  <p className="text-sm text-red-600 mt-1">{errors.capacity}</p>
                )}
              </div>

              <div>
                <Label htmlFor="size">Room Size *</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  placeholder="45m²"
                  className={errors.size ? "border-red-500" : ""}
                />
                {errors.size && (
                  <p className="text-sm text-red-600 mt-1">{errors.size}</p>
                )}
              </div>

              <div>
                <Label htmlFor="floor">Floor Number *</Label>
                <Input
                  id="floor"
                  type="number"
                  min="1"
                  value={formData.floor}
                  onChange={(e) =>
                    handleInputChange("floor", parseInt(e.target.value) || 1)
                  }
                  className={errors.floor ? "border-red-500" : ""}
                />
                {errors.floor && (
                  <p className="text-sm text-red-600 mt-1">{errors.floor}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the room features and amenities..."
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Room Image */}
            <div>
              <Label>Room Image</Label>
              <div className="mt-2">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Room preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Label>Amenities</Label>
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add amenity..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
                  />
                  <Button type="button" onClick={handleAddAmenity}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected Amenities */}
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity: string) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(amenity)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Common Amenities */}
                <div>
                  <p className="text-sm text-slate-600 mb-2">
                    Quick add common amenities:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {commonAmenities
                      .filter(
                        (amenity) => !formData.amenities.includes(amenity),
                      )
                      .map((amenity) => (
                        <Button
                          key={amenity}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleInputChange("amenities", [
                              ...formData.amenities,
                              amenity,
                            ])
                          }
                        >
                          + {amenity}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Initial Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-900 hover:bg-blue-800"
              >
                {room ? "Update Room" : "Create Room"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
