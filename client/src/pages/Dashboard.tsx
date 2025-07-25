import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Settings, Menu } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Menus",
      value: "12",
      icon: Menu,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "48",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Roles",
      value: "5",
      icon: Settings,
      color: "text-purple-600",
    },
    {
      title: "System Health",
      value: "98%",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Menu className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium">Manage Menus</h3>
              <p className="text-sm text-gray-600">
                Add, edit, or remove navigation menu items
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Users className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium">User Management</h3>
              <p className="text-sm text-gray-600">
                Control user access and permissions
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Settings className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-medium">System Settings</h3>
              <p className="text-sm text-gray-600">
                Configure application settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
