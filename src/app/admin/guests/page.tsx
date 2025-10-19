"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  preferences: string[];
  loyaltyTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalStays: number;
  totalSpent: number;
  lastVisit: string;
  avatar?: string;
}

const mockGuests: Guest[] = [
  {
    id: "G001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    nationality: "United States",
    dateOfBirth: "1985-03-15",
    preferences: ["Ocean View", "Late Check-out", "Extra Pillows"],
    loyaltyTier: "Gold",
    totalStays: 12,
    totalSpent: 4500,
    lastVisit: "2024-01-10",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "G002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    nationality: "Canada",
    dateOfBirth: "1990-07-22",
    preferences: ["Non-smoking", "High Floor", "Room Service"],
    loyaltyTier: "Silver",
    totalStays: 5,
    totalSpent: 1800,
    lastVisit: "2024-01-08",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "G003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 345-6789",
    nationality: "United Kingdom",
    dateOfBirth: "1978-11-08",
    preferences: ["Balcony", "Gym Access", "Restaurant Reservations"],
    loyaltyTier: "Platinum",
    totalStays: 25,
    totalSpent: 12000,
    lastVisit: "2024-01-05",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "G004",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    nationality: "Australia",
    dateOfBirth: "1992-01-30",
    preferences: ["City View", "Early Check-in", "Laundry Service"],
    loyaltyTier: "Bronze",
    totalStays: 2,
    totalSpent: 600,
    lastVisit: "2023-12-20",
  },
];

const loyaltyColors = {
  Bronze: "bg-amber-100 text-amber-800",
  Silver: "bg-slate-100 text-slate-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Platinum: "bg-purple-100 text-purple-800",
};

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [searchTerm, setSearchTerm] = useState("");
  const [loyaltyFilter, setLoyaltyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("lastVisit");
  const router = useRouter();

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      `${guest.firstName} ${guest.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.nationality.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLoyalty =
      loyaltyFilter === "all" || guest.loyaltyTier === loyaltyFilter;

    return matchesSearch && matchesLoyalty;
  });

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
        );
      case "lastVisit":
        return (
          new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        );
      case "totalSpent":
        return b.totalSpent - a.totalSpent;
      case "totalStays":
        return b.totalStays - a.totalStays;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
                Guest Management
              </h1>
              <p className="text-slate-600">
                Manage guest information, preferences, and loyalty programs
              </p>
            </div>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              Add New Guest
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Guests
                </CardTitle>
                <Users className="w-4 h-4 text-blue-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {guests.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Loyalty Members
                </CardTitle>
                <Star className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {guests.filter((g) => g.loyaltyTier !== "Bronze").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Avg. Stay Value
                </CardTitle>
                <span className="text-green-600">$</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  $
                  {Math.round(
                    guests.reduce((sum, g) => sum + g.totalSpent, 0) /
                      guests.length,
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Recent Visitors
                </CardTitle>
                <Calendar className="w-4 h-4 text-blue-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {
                    guests.filter((g) => {
                      const lastVisit = new Date(g.lastVisit);
                      const thirtyDaysAgo = new Date();
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                      return lastVisit >= thirtyDaysAgo;
                    }).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={loyaltyFilter} onValueChange={setLoyaltyFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by loyalty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="lastVisit">Last Visit</SelectItem>
                <SelectItem value="totalSpent">Total Spent</SelectItem>
                <SelectItem value="totalStays">Total Stays</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Guests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Directory</CardTitle>
              <CardDescription>
                {sortedGuests.length} guest
                {sortedGuests.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Loyalty</TableHead>
                    <TableHead>Stays</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={guest.avatar}
                              alt={`${guest.firstName} ${guest.lastName}`}
                            />
                            <AvatarFallback>
                              {getInitials(guest.firstName, guest.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {guest.firstName} {guest.lastName}
                            </div>
                            <div className="text-sm text-slate-600">
                              {guest.nationality}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {guest.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3" />
                            {guest.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={loyaltyColors[guest.loyaltyTier]}>
                          {guest.loyaltyTier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{guest.totalStays}</div>
                          <div className="text-sm text-slate-600">stays</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${guest.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>{formatDate(guest.lastVisit)}</TableCell>
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Guest
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Guest
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

          {sortedGuests.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No guests found
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
