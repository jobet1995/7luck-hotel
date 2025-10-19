"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MapPin,
  Plus,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/components/Sidebar";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    guestName: "John Smith",
    guestEmail: "john.smith@email.com",
    roomName: "Deluxe Suite 101",
    roomType: "Deluxe Suite",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 2,
    totalAmount: 897,
    status: "confirmed",
    specialRequests: "Late check-in after 10 PM",
  },
  {
    id: "BK002",
    guestName: "Sarah Johnson",
    guestEmail: "sarah.j@email.com",
    roomName: "Premium Ocean View 205",
    roomType: "Premium Room",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    guests: 2,
    totalAmount: 996,
    status: "checked-in",
  },
  {
    id: "BK003",
    guestName: "Michael Brown",
    guestEmail: "michael.brown@email.com",
    roomName: "Royal Villa 301",
    roomType: "Royal Villa",
    checkIn: "2024-01-14",
    checkOut: "2024-01-16",
    guests: 4,
    totalAmount: 3594,
    status: "checked-out",
  },
  {
    id: "BK004",
    guestName: "Emily Davis",
    guestEmail: "emily.davis@email.com",
    roomName: "Presidential Suite 501",
    roomType: "Presidential Suite",
    checkIn: "2024-01-17",
    checkOut: "2024-01-22",
    guests: 6,
    totalAmount: 4495,
    status: "cancelled",
  },
];

const statusColors = {
  confirmed: "bg-blue-100 text-blue-800",
  "checked-in": "bg-green-100 text-green-800",
  "checked-out": "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  confirmed: <Clock className="w-3 h-3" />,
  "checked-in": <CheckCircle className="w-3 h-3" />,
  "checked-out": <CheckCircle className="w-3 h-3" />,
  cancelled: <XCircle className="w-3 h-3" />,
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("checkIn");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const router = useRouter();

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case "guestName":
        return a.guestName.localeCompare(b.guestName);
      case "checkIn":
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      case "totalAmount":
        return b.totalAmount - a.totalAmount;
      default:
        return 0;
    }
  });

  const handleStatusChange = (
    bookingId: string,
    newStatus: Booking["status"],
  ) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  const getNights = (checkIn: string, checkOut: string) => {
    const diffTime = Math.abs(
      new Date(checkOut).getTime() - new Date(checkIn).getTime(),
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
                Booking Management
              </h1>
              <p className="text-slate-600">
                Manage reservations, check-ins, and guest stays
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={viewMode}
                onValueChange={(value: "table" | "cards") => setViewMode(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="cards">Card View</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/bookings/new")}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search bookings..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkIn">Check-in Date</SelectItem>
                <SelectItem value="guestName">Guest Name</SelectItem>
                <SelectItem value="totalAmount">Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Display */}
          {viewMode === "table" ? (
            <Card>
              <CardHeader>
                <CardTitle>Bookings Overview</CardTitle>
                <CardDescription>
                  {sortedBookings.length} booking
                  {sortedBookings.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Nights</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {booking.guestName}
                            </div>
                            <div className="text-sm text-slate-600">
                              {booking.guestEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {booking.roomName}
                            </div>
                            <div className="text-sm text-slate-600">
                              {booking.roomType}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(booking.checkIn)}</TableCell>
                        <TableCell>{formatDate(booking.checkOut)}</TableCell>
                        <TableCell>
                          {getNights(booking.checkIn, booking.checkOut)} nights
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.guests}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${booking.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[booking.status]}>
                            {statusIcons[booking.status]}
                            <span className="ml-1 capitalize">
                              {booking.status.replace("-", " ")}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                ⋯
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteBooking(booking.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={statusColors[booking.status]}>
                          {statusIcons[booking.status]}
                          <span className="ml-1 capitalize">
                            {booking.status.replace("-", " ")}
                          </span>
                        </Badge>
                        <span className="text-sm font-medium text-slate-600">
                          {booking.id}
                        </span>
                      </div>
                      <CardTitle className="text-lg">
                        {booking.guestName}
                      </CardTitle>
                      <CardDescription>{booking.guestEmail}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">{booking.roomName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-600">Check-in:</span>
                          <div className="font-medium">
                            {formatDate(booking.checkIn)}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-600">Check-out:</span>
                          <div className="font-medium">
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">
                            {booking.guests} guests
                          </span>
                        </div>
                        <span className="font-semibold text-blue-900">
                          ${booking.totalAmount}
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Select
                          value={booking.status}
                          onValueChange={(value: Booking["status"]) =>
                            handleStatusChange(booking.id, value)
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="checked-in">Check-in</SelectItem>
                            <SelectItem value="checked-out">
                              Check-out
                            </SelectItem>
                            <SelectItem value="cancelled">Cancel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {sortedBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No bookings found
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
