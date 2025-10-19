"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Users,
  DollarSign,
  Bed,
  Activity,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("overview");
  const router = useRouter();

  const overviewStats = {
    totalRevenue: 124750,
    totalBookings: 342,
    occupancyRate: 78,
    avgStayDuration: 3.2,
    totalGuests: 456,
    revenueGrowth: 12.5,
    bookingGrowth: 8.3,
    occupancyGrowth: -2.1,
  };

  const revenueData = [
    { month: "Jan", revenue: 95000, bookings: 120 },
    { month: "Feb", revenue: 102000, bookings: 135 },
    { month: "Mar", revenue: 118000, bookings: 142 },
    { month: "Apr", revenue: 124000, bookings: 158 },
    { month: "May", revenue: 134000, bookings: 167 },
    { month: "Jun", revenue: 124750, bookings: 156 },
  ];

  const roomTypeData = [
    { type: "Deluxe Suite", bookings: 45, revenue: 15750 },
    { type: "Premium Room", bookings: 38, revenue: 13300 },
    { type: "Royal Villa", bookings: 28, revenue: 19600 },
    { type: "Presidential Suite", bookings: 12, revenue: 12900 },
    { type: "Standard Room", bookings: 33, revenue: 8250 },
  ];

  const topGuests = [
    { name: "Michael Brown", stays: 8, spent: 12400 },
    { name: "Sarah Johnson", stays: 6, spent: 8900 },
    { name: "John Smith", stays: 5, spent: 7200 },
    { name: "Emily Davis", stays: 4, spent: 5600 },
    { name: "Robert Wilson", stays: 3, spent: 4200 },
  ];

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
                Reports & Analytics
              </h1>
              <p className="text-slate-600">
                Business intelligence and performance metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs
            value={reportType}
            onValueChange={setReportType}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="guests">Guests</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Total Revenue
                      </CardTitle>
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-800">
                        ${overviewStats.totalRevenue.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1 text-green-600" />+
                        {overviewStats.revenueGrowth}% from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Total Bookings
                      </CardTitle>
                      <Calendar className="w-4 h-4 text-blue-900" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-800">
                        {overviewStats.totalBookings}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1 text-green-600" />+
                        {overviewStats.bookingGrowth}% from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Occupancy Rate
                      </CardTitle>
                      <Bed className="w-4 h-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-800">
                        {overviewStats.occupancyRate}%
                      </div>
                      <p className="text-xs text-slate-500 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                        {overviewStats.occupancyGrowth}% from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Avg. Stay Duration
                      </CardTitle>
                      <Activity className="w-4 h-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-800">
                        {overviewStats.avgStayDuration} nights
                      </div>
                      <p className="text-xs text-slate-500">
                        Average length of stay
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    Monthly revenue and booking trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-end justify-between space-x-2">
                    {revenueData.map((data, index) => (
                      <div
                        key={data.month}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="text-xs text-slate-600">
                          {data.month}
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <div
                            className="w-8 bg-blue-900 rounded-t"
                            style={{
                              height: `${(data.revenue / 140000) * 200}px`,
                            }}
                          ></div>
                          <div
                            className="w-6 bg-green-600 rounded-t"
                            style={{
                              height: `${(data.bookings / 170) * 150}px`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500">
                          ${data.revenue.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-900 rounded"></div>
                      <span className="text-sm text-slate-600">Revenue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-sm text-slate-600">Bookings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Room Type</CardTitle>
                  <CardDescription>
                    Revenue breakdown by accommodation type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roomTypeData.map((room, index) => (
                      <div
                        key={room.type}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{room.type}</div>
                            <div className="text-sm text-slate-600">
                              {room.bookings} bookings
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${room.revenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">
                            Avg: ${(room.revenue / room.bookings).toFixed(0)}
                            /booking
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="occupancy" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Trends</CardTitle>
                    <CardDescription>Daily occupancy rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-500">
                      <div className="text-center">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Occupancy chart visualization</p>
                        <p className="text-sm">
                          Would be implemented with a charting library
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Room Utilization</CardTitle>
                    <CardDescription>Room type performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roomTypeData.map((room) => (
                        <div
                          key={room.type}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{room.type}</div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-900 h-2 rounded-full"
                                style={{
                                  width: `${(room.bookings / 60) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4 text-sm text-slate-600">
                            {room.bookings}/60
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Guests</CardTitle>
                  <CardDescription>
                    Most valuable customers by spending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topGuests.map((guest, index) => (
                      <div
                        key={guest.name}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            <div className="text-sm text-slate-600">
                              {guest.stays} stays
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${guest.spent.toLocaleString()}
                          </div>
                          <Badge variant="outline">VIP</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
