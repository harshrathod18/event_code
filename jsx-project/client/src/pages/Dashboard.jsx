import { Card, Row, Col, Container } from "react-bootstrap";
import { BarChart3, Users, Settings, Menu } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Menus",
      value: "12",
      icon: Menu,
      color: "text-primary",
    },
    {
      title: "Active Users",
      value: "48",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Total Roles",
      value: "5",
      icon: Settings,
      color: "text-info",
    },
    {
      title: "System Health",
      value: "98%",
      icon: BarChart3,
      color: "text-warning",
    },
  ];

  const quickActions = [
    {
      title: "Manage Menus",
      description: "Add, edit, or remove navigation menu items",
      icon: Menu,
      href: "/menu-list"
    },
    {
      title: "User Management",
      description: "Add, edit, or remove user accounts",
      icon: Users,
      href: "/users"
    },
    {
      title: "System Settings",
      description: "Configure system preferences and settings",
      icon: Settings,
      href: "/settings"
    }
  ];

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">Dashboard</h1>
        <p className="text-muted">Welcome to your admin dashboard</p>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
              <Card className="dashboard-card h-100">
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-2 small">{stat.title}</p>
                    <h3 className="text-primary-custom mb-0">{stat.value}</h3>
                  </div>
                  <Icon size={24} className={stat.color} />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <Card.Header>
          <Card.Title className="mb-0">Quick Actions</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Col key={index} xs={12} md={4} className="mb-3">
                  <div 
                    className="p-3 border rounded-3 h-100 text-decoration-none text-dark"
                    style={{cursor: 'pointer', transition: 'all 0.2s'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <Icon size={24} className="text-primary-custom mb-2" />
                    <h6 className="fw-medium mb-2">{action.title}</h6>
                    <p className="text-muted small mb-0">{action.description}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}