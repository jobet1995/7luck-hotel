"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Bed,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";

interface Room {
  id: string;
  name: string;
  type: string;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  price: number;
  capacity: number;
  size: string;
  floor: number;
  amenities: string[];
  image: string;
  description: string;
}

const mockRooms: Room[] = [
  {
    id: "deluxe-101",
    name: "Deluxe Suite 101",
    type: "Deluxe Suite",
    status: "available",
    price: 299,
    capacity: 2,
    size: "45m²",
    floor: 1,
    amenities: ["Free WiFi", "Balcony", "Mini Bar", "Smart TV"],
    image:
      "https://images.unsplash.com/photo-1759223198981-661cadbbff36?w=400&h=250&fit=crop",
    description: "Spacious luxury suite with ocean view and modern amenities",
  },
  {
    id: "premium-205",
    name: "Premium Ocean View 205",
    type: "Premium Room",
    status: "occupied",
    price: 249,
    capacity: 2,
    size: "38m²",
    floor: 2,
    amenities: ["Free WiFi", "Balcony", "Coffee Machine", "Smart TV"],
    image:
      "https://images.unsplash.com/photo-1729605411476-defbdab14c54?w=400&h=250&fit=crop",
    description: "Breathtaking views with premium furnishings and balcony",
  },
  {
    id: "royal-301",
    name: "Royal Villa 301",
    type: "Royal Villa",
    status: "maintenance",
    price: 599,
    capacity: 6,
    size: "85m²",
    floor: 3,
    amenities: ["Private Pool", "Garden", "Butler Service", "Free WiFi"],
    image:
      "https://images.unsplash.com/photo-1694967832949-09984640b143?w=400&h=250&fit=crop",
    description: "Private villa with pool, garden, and exclusive services",
  },
  {
    id: "presidential-501",
    name: "Presidential Suite 501",
    type: "Presidential Suite",
    status: "cleaning",
    price: 899,
    capacity: 8,
    size: "120m²",
    floor: 5,
    amenities: [
      "Private Pool",
      "Butler Service",
      "VIP Lounge Access",
      "Free WiFi",
    ],
    image:
      "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?w=400&h=250&fit=crop",
    description: "Ultimate luxury with panoramic views and VIP treatment",
  },
];

const statusColors = {
  available: "bg-green-100 text-green-800",
  occupied: "bg-red-100 text-red-800",
  maintenance: "bg-yellow-100 text-yellow-800",
  cleaning: "bg-blue-100 text-blue-800",
};

const statusIcons = {
  available: "✓",
  occupied: "👤",
  maintenance: "🔧",
  cleaning: "🧹",
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const router = useRouter();

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || room.status === statusFilter;
    const matchesType = typeFilter === "all" || room.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const roomTypes = Array.from(new Set(rooms.map((room) => room.type)));

  const handleStatusChange = (roomId: string, newStatus: Room["status"]) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room,
      ),
    );
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-playfair font-bold text-slate-800">
                Room Management
              </h1>
              <p className="text-slate-600">
                Manage your hotel rooms, availability, and pricing
              </p>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              Add New Room
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/rooms/bulk-actions")}
            >
              <Filter className="w-4 h-4 mr-2" />
              Bulk Actions
            </Button>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={room.image}
                      alt={room.name}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${statusColors[room.status]}`}
                    >
                      {statusIcons[room.status]} {room.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-3 right-3 h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Room
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Type:</span>
                        <Badge variant="outline">{room.type}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Price:</span>
                        <span className="font-semibold text-blue-900">
                          ${room.price}/night
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Capacity:
                        </span>
                        <span className="text-sm">{room.capacity} guests</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Size:</span>
                        <span className="text-sm">{room.size}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Floor:</span>
                        <span className="text-sm">{room.floor}</span>
                      </div>

                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.slice(0, 3).map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="secondary"
                              className="text-xs flex items-center gap-1"
                            >
                              {amenity === "Free WiFi" && (
                                <Wifi className="w-3 h-3" />
                              )}
                              {amenity === "Parking" && (
                                <Car className="w-3 h-3" />
                              )}
                              {amenity === "Coffee Machine" && (
                                <Coffee className="w-3 h-3" />
                              )}
                              {![
                                "Free WiFi",
                                "Parking",
                                "Coffee Machine",
                              ].includes(amenity) && "✓"}
                              {amenity}
                            </Badge>
                          ))}
                          {room.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{room.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <Select
                          value={room.status}
                          onValueChange={(value: Room["status"]) =>
                            handleStatusChange(room.id, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <Bed className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No rooms found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
