"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Wrench,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  User,
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

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  category: string;
  location: string;
  assignedTo?: string;
  createdDate: string;
  dueDate: string;
  completedDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  cost?: number;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: "MT001",
    title: "HVAC System Maintenance",
    description: "Regular maintenance check for all air conditioning units",
    priority: "medium",
    status: "in-progress",
    category: "HVAC",
    location: "All Floors",
    assignedTo: "Mike Johnson",
    createdDate: "2024-01-10",
    dueDate: "2024-01-20",
    estimatedHours: 8,
    actualHours: 6,
    cost: 450,
  },
  {
    id: "MT002",
    title: "Elevator Inspection",
    description: "Monthly safety inspection for all elevators",
    priority: "high",
    status: "pending",
    category: "Safety",
    location: "Main Elevator Bank",
    assignedTo: "Sarah Wilson",
    createdDate: "2024-01-12",
    dueDate: "2024-01-15",
    estimatedHours: 4,
  },
  {
    id: "MT003",
    title: "Pool Filter Cleaning",
    description: "Clean and replace pool filtration system",
    priority: "low",
    status: "completed",
    category: "Pool",
    location: "Main Pool Area",
    assignedTo: "David Chen",
    createdDate: "2024-01-08",
    dueDate: "2024-01-14",
    completedDate: "2024-01-13",
    estimatedHours: 3,
    actualHours: 3,
    cost: 120,
  },
  {
    id: "MT004",
    title: "Room 301 Leak Repair",
    description: "Fix bathroom leak in Presidential Suite 301",
    priority: "urgent",
    status: "in-progress",
    category: "Plumbing",
    location: "Room 301",
    assignedTo: "Alex Rodriguez",
    createdDate: "2024-01-14",
    dueDate: "2024-01-15",
    estimatedHours: 2,
    actualHours: 1,
    cost: 80,
  },
  {
    id: "MT005",
    title: "Gym Equipment Service",
    description: "Quarterly maintenance for fitness center equipment",
    priority: "medium",
    status: "pending",
    category: "Equipment",
    location: "Fitness Center",
    assignedTo: "Lisa Park",
    createdDate: "2024-01-11",
    dueDate: "2024-01-25",
    estimatedHours: 6,
  },
];

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function MaintenancePage() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const router = useRouter();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedTo &&
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "priority":
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "createdDate":
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      default:
        return 0;
    }
  });

  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (dueDate: string) => {
    return getDaysUntilDue(dueDate) < 0;
  };

  const handleStatusChange = (
    taskId: string,
    newStatus: MaintenanceTask["status"],
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completedDate:
                newStatus === "completed"
                  ? new Date().toISOString().split("T")[0]
                  : task.completedDate,
            }
          : task,
      ),
    );
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
                Maintenance Management
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Track facility maintenance tasks and repairs
              </p>
            </div>
            <Button
              className="bg-blue-900 hover:bg-blue-800"
              onClick={() => router.push("/admin/maintenance/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
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
                  Total Tasks
                </CardTitle>
                <Wrench className="w-4 h-4 text-blue-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {tasks.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  In Progress
                </CardTitle>
                <Clock className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {tasks.filter((t) => t.status === "in-progress").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Overdue
                </CardTitle>
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {
                    tasks.filter(
                      (t) => isOverdue(t.dueDate) && t.status !== "completed",
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Completed
                </CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {tasks.filter((t) => t.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search maintenance tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="createdDate">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tasks Table */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Tasks</CardTitle>
              <CardDescription>
                {sortedTasks.length} task{sortedTasks.length !== 1 ? "s" : ""}{" "}
                found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTasks.map((task, index) => {
                    const daysUntilDue = getDaysUntilDue(task.dueDate);
                    const overdue =
                      isOverdue(task.dueDate) && task.status !== "completed";

                    return (
                      <motion.tr
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={overdue ? "bg-red-50" : ""}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-slate-600">
                              {task.description}
                            </div>
                            <div className="text-xs text-slate-500">
                              ID: {task.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={task.status}
                            onValueChange={(value: MaintenanceTask["status"]) =>
                              handleStatusChange(task.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <Badge className={statusColors[task.status]}>
                                {task.status.replace("-", " ")}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{task.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {task.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          {task.assignedTo ? (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              {task.assignedTo}
                            </div>
                          ) : (
                            <span className="text-slate-400">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`${overdue ? "text-red-600 font-medium" : ""}`}
                          >
                            {formatDate(task.dueDate)}
                            {daysUntilDue >= 0 && (
                              <div className="text-xs text-slate-500">
                                {daysUntilDue === 0
                                  ? "Due today"
                                  : `${daysUntilDue} days`}
                              </div>
                            )}
                            {overdue && (
                              <div className="text-xs text-red-600">
                                {Math.abs(daysUntilDue)} days overdue
                              </div>
                            )}
                          </div>
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
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                Assign Staff
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {sortedTasks.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No maintenance tasks found
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
