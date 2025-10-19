"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalGuests: number;
  occupancyRate: number;
}

export default function AdminDashboard() {
  const router = useRouter();

  const stats: DashboardStats = {
    totalBookings: 156,
    totalRevenue: 45750,
    totalGuests: 342,
    occupancyRate: 78,
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
                Dashboard
              </h1>
              <p className="text-slate-600">
                Welcome back! Here&apos;s an overview of your hotel&apos;s
                performance.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Bookings
                  </CardTitle>
                  <Calendar className="w-4 h-4 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {stats.totalBookings}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    ${stats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +8% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Guests
                  </CardTitle>
                  <Users className="w-4 h-4 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {stats.totalGuests}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +15% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Occupancy Rate
                  </CardTitle>
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {stats.occupancyRate}%
                  </div>
                  <p className="text-xs text-slate-500">
                    <Badge
                      variant={
                        stats.occupancyRate >= 80 ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {stats.occupancyRate >= 80 ? "High" : "Moderate"}
                    </Badge>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Manage your hotel operations efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => router.push("/admin/bookings")}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>View Bookings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => router.push("/admin/guests")}
                  >
                    <Users className="w-5 h-5" />
                    <span>Manage Guests</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                    onClick={() => router.push("/admin/reports")}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
