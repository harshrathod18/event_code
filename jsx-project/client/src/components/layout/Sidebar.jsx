import { Nav } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import { BarChart3, List, UserCheck, Shield, X, Plus } from "lucide-react";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
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
      title: "Menu List",
      icon: List,
      href: "/menu-list",
    },
    {
      title: "Add Menu",
      icon: Plus,
      href: "/add-menu",
    },
    {
      title: "Manage Roles",
      icon: UserCheck,
      href: "/roles",
    },
  ];

  const isActive = (href) => location === href || (href === "/dashboard" && location === "/");

  const handleNavClick = () => {
    // Close sidebar on mobile when nav item is clicked
    if (window.innerWidth < 993) {
      onClose();
    }
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'show' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Shield size={20} className="me-2" />
          ADMIN PANEL
        </div>
        <button 
          className="btn btn-link text-white d-lg-none p-0"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
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
                  onClick={handleNavClick}
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
            Management
          </div>
          {roleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Nav.Item key={item.href}>
                <Link href={item.href}>
                  <Nav.Link
                    as="div"
                    className={`d-flex align-items-center ms-3 ${isActive(item.href) ? "active" : ""}`}
                    onClick={handleNavClick}
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