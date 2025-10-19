"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Bed,
  Users,
  UserCog,
  BarChart3,
  Settings,
  Package,
  Wrench,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
    badge: "12",
  },
  {
    title: "Rooms",
    href: "/admin/rooms",
    icon: Bed,
  },
  {
    title: "Guests",
    href: "/admin/guests",
    icon: Users,
    badge: "8",
  },
  {
    title: "Staff",
    href: "/admin/staff",
    icon: UserCog,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  {
    title: "Maintenance",
    href: "/admin/maintenance",
    icon: Wrench,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    router.push("/");
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-900 rounded-lg">
              <Hotel className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                7Luck Hotel
              </h2>
              <p className="text-xs text-slate-600">Admin Panel</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    isActive && "bg-blue-50 text-blue-900 border-blue-200",
                    collapsed && "px-0 justify-center",
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="w-4 h-4" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="ml-auto bg-blue-900 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "px-0 justify-center",
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
