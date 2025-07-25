import { Nav } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import { BarChart3, List, UserCheck, Shield } from "lucide-react";

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

  const isActive = (href) => location === href || (href === "/dashboard" && location === "/");

  return (
    <div className="admin-sidebar slide-in">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Shield size={20} className="me-2" />
        ADMIN PANEL
      </div>

      {/* Navigation Menu */}
      <Nav className="sidebar-nav flex-column">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Nav.Item key={item.href}>
              <Link href={item.href}>
                <Nav.Link
                  as="div"
                  className={`d-flex align-items-center ${isActive(item.href) ? "active" : ""}`}
                >
                  <Icon size={18} className="me-2" />
                  {item.title}
                </Nav.Link>
              </Link>
            </Nav.Item>
          );
        })}

        {/* Role and Rights Section */}
        <div className="mt-3">
          <div className="px-3 py-2 text-muted small text-uppercase fw-bold">
            <UserCheck size={16} className="me-2" />
            Role and Rights
          </div>
          {roleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Nav.Item key={item.href}>
                <Link href={item.href}>
                  <Nav.Link
                    as="div"
                    className={`d-flex align-items-center ms-3 ${isActive(item.href) ? "active" : ""}`}
                  >
                    <Icon size={16} className="me-2" />
                    {item.title}
                  </Nav.Link>
                </Link>
              </Nav.Item>
            );
          })}
        </div>
      </Nav>
    </div>
  );
}