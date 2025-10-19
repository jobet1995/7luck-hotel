"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Eye,
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

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: "INV001",
    name: "Luxury Bed Sheets",
    category: "Linens",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "sets",
    unitPrice: 85,
    supplier: "Premium Linens Co.",
    lastRestocked: "2024-01-10",
    status: "in-stock",
  },
  {
    id: "INV002",
    name: "Mini Bar Snacks",
    category: "Food & Beverage",
    currentStock: 12,
    minStock: 20,
    maxStock: 50,
    unit: "boxes",
    unitPrice: 45,
    supplier: "Gourmet Snacks Ltd.",
    lastRestocked: "2024-01-08",
    status: "low-stock",
  },
  {
    id: "INV003",
    name: "Bathroom Amenities",
    category: "Toiletries",
    currentStock: 0,
    minStock: 30,
    maxStock: 80,
    unit: "kits",
    unitPrice: 12,
    supplier: "Luxury Essentials",
    lastRestocked: "2024-01-05",
    status: "out-of-stock",
  },
  {
    id: "INV004",
    name: "Coffee Pods",
    category: "Food & Beverage",
    currentStock: 156,
    minStock: 50,
    maxStock: 200,
    unit: "boxes",
    unitPrice: 28,
    supplier: "Premium Coffee Roasters",
    lastRestocked: "2024-01-12",
    status: "in-stock",
  },
  {
    id: "INV005",
    name: "Towels",
    category: "Linens",
    currentStock: 78,
    minStock: 40,
    maxStock: 150,
    unit: "pieces",
    unitPrice: 15,
    supplier: "Textile Solutions",
    lastRestocked: "2024-01-11",
    status: "in-stock",
  },
];

const statusColors = {
  "in-stock": "bg-green-100 text-green-800",
  "low-stock": "bg-yellow-100 text-yellow-800",
  "out-of-stock": "bg-red-100 text-red-800",
};

const statusIcons = {
  "in-stock": <CheckCircle className="w-3 h-3" />,
  "low-stock": <AlertTriangle className="w-3 h-3" />,
  "out-of-stock": <AlertTriangle className="w-3 h-3" />,
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const router = useRouter();

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "currentStock":
        return a.currentStock - b.currentStock;
      case "unitPrice":
        return a.unitPrice - b.unitPrice;
      default:
        return 0;
    }
  });

  const categories = Array.from(
    new Set(inventory.map((item) => item.category)),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const getTotalValue = () => {
    return inventory.reduce(
      (total, item) => total + item.currentStock * item.unitPrice,
      0,
    );
  };

  const getLowStockItems = () => {
    return inventory.filter(
      (item) => item.status === "low-stock" || item.status === "out-of-stock",
    ).length;
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
                Inventory Management
              </h1>
              <p className="text-slate-600">
                Track supplies, amenities, and stock levels
              </p>
            </div>
            <Button
              className="bg-blue-900 hover:bg-blue-800"
              onClick={() => router.push("/admin/inventory/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
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
                  Total Items
                </CardTitle>
                <Package className="w-4 h-4 text-blue-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {inventory.length}
                </div>
                <p className="text-xs text-slate-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Value
                </CardTitle>
                <span className="text-green-600">$</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  ${getTotalValue().toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                  -3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Low Stock Items
                </CardTitle>
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {getLowStockItems()}
                </div>
                <p className="text-xs text-slate-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-blue-600" />
                  Updated 5 minutes ago
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Out of Stock
                </CardTitle>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {
                    inventory.filter((item) => item.status === "out-of-stock")
                      .length
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
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="currentStock">Stock Level</SelectItem>
                <SelectItem value="unitPrice">Unit Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>
                {sortedInventory.length} item
                {sortedInventory.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Last Restocked</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedInventory.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-slate-600">
                            ID: {item.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {item.currentStock} / {item.maxStock} {item.unit}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.status === "out-of-stock"
                                  ? "bg-red-500"
                                  : item.status === "low-stock"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{
                                width: `${getStockPercentage(item.currentStock, item.maxStock)}%`,
                              }}
                            ></div>
                          </div>
                          {item.currentStock <= item.minStock && (
                            <div className="text-xs text-red-600 flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Reorder needed
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[item.status]}>
                          {statusIcons[item.status]}
                          <span className="ml-1 capitalize">
                            {item.status.replace("-", " ")}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>${item.unitPrice}</TableCell>
                      <TableCell className="font-medium">
                        ${(item.currentStock * item.unitPrice).toLocaleString()}
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{formatDate(item.lastRestocked)}</TableCell>
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
                              Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="w-4 h-4 mr-2" />
                              Restock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setInventory(
                                  inventory.filter((i) => i.id !== item.id),
                                );
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {sortedInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No inventory items found
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
