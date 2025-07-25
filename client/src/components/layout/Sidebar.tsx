import { Link, useLocation } from "wouter";
import { Shield, BarChart3, List, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
  ];

  const roleItems = [
    {
      title: "Manage Menu",
      icon: List,
      href: "/menu-list",
    },
    {
      title: "Manage Roles",
      icon: UserCheck,
      href: "/roles",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 bg-primary text-white font-bold text-lg border-b border-primary">
        <Shield className="w-5 h-5 mr-2" />
        ADMIN PANEL
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href || location === "/";
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-400" />
                  {item.title}
                </a>
              </Link>
            );
          })}

          {/* Role and Rights Section */}
          <div className="mt-4">
            <div className="flex items-center px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 mr-2" />
              Role and Rights
            </div>
            <div className="ml-4 space-y-1">
              {roleItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <Icon className="w-4 h-4 mr-3 text-gray-400" />
                      {item.title}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2024 NxApps. All rights reserved.
        </div>
      </div>
    </div>
  );
}
