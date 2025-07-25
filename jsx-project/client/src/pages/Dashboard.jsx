import { Card, Row, Col, Badge } from "react-bootstrap";
import { BarChart3, Users, Settings, Menu, TrendingUp, Package, Activity, Clock, CheckCircle, Plus } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Menus",
      value: "24",
      icon: Menu,
      color: "primary",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "1,834",
      icon: Users,
      color: "success", 
      change: "+5.4%",
      trend: "up"
    },
    {
      title: "Categories",
      value: "12",
      icon: Package,
      color: "warning",
      change: "+2.1%",
      trend: "up"
    },
    {
      title: "Growth",
      value: "98.5%",
      icon: TrendingUp,
      color: "info",
      change: "+8.2%",
      trend: "up"
    },
  ];

  const recentActivities = [
    {
      action: "Menu created: 'Home Page'",
      time: "2 hours ago",
      type: "create",
      icon: CheckCircle
    },
    {
      action: "User role updated",
      time: "5 hours ago", 
      type: "update",
      icon: Activity
    },
    {
      action: "Menu deleted: 'Old Page'",
      time: "1 day ago",
      type: "delete",
      icon: Clock
    }
  ];

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header mb-4">
        <h1>Dashboard</h1>
        <p>Welcome to your admin dashboard - manage your content with ease</p>
      </div>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col xl={3} lg={6} md={6} sm={12} key={index}>
              <Card className="dashboard-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <div className="card-title text-muted mb-2">
                        {stat.title}
                      </div>
                      <h3 className="mb-0">{stat.value}</h3>
                    </div>
                    <div className={`p-3 rounded-circle bg-${stat.color} bg-opacity-10`}>
                      <Icon size={24} className={`text-${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Badge 
                      bg={stat.trend === 'up' ? 'success' : 'danger'} 
                      className="status-badge"
                    >
                      {stat.change}
                    </Badge>
                    <span className="text-muted ms-2 small">from last month</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Dashboard Content Grid */}
      <Row className="g-4">
        {/* Analytics Chart Section */}
        <Col xl={8} lg={12}>
          <Card className="table-container h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-dark">Menu Analytics</h5>
              <Badge bg="primary" className="status-badge">Live Data</Badge>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="chart-placeholder text-center py-5">
                <BarChart3 size={64} className="text-muted mb-3" />
                <h6 className="text-muted">Interactive Chart Area</h6>
                <p className="text-muted small">
                  Real-time analytics and performance metrics would be displayed here
                </p>
                <div className="row g-3 mt-4">
                  <div className="col-4">
                    <div className="quick-action-card text-center">
                      <h6 className="text-primary">156</h6>
                      <small className="text-muted">Views Today</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="quick-action-card text-center">
                      <h6 className="text-success">89%</h6>
                      <small className="text-muted">Success Rate</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="quick-action-card text-center">
                      <h6 className="text-info">2.4s</h6>
                      <small className="text-muted">Avg Load Time</small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities Section */}
        <Col xl={4} lg={12}>
          <Card className="table-container h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-dark">Recent Activities</h5>
              <Badge bg="info" className="status-badge">
                {recentActivities.length} New
              </Badge>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="activity-list">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div 
                      key={index} 
                      className="d-flex align-items-center p-3 border-bottom activity-item"
                    >
                      <div className={`p-2 rounded-circle me-3 ${
                        activity.type === 'create' ? 'bg-success bg-opacity-10' :
                        activity.type === 'update' ? 'bg-warning bg-opacity-10' :
                        'bg-danger bg-opacity-10'
                      }`}>
                        <Icon size={16} className={
                          activity.type === 'create' ? 'text-success' :
                          activity.type === 'update' ? 'text-warning' :
                          'text-danger'
                        } />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium text-dark mb-1">
                          {activity.action}
                        </div>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 text-center border-top">
                <a href="#" className="text-primary text-decoration-none fw-medium">
                  View All Activities →
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Row */}
      <Row className="g-4 mt-2">
        <Col md={4}>
          <div className="quick-action-card text-center">
            <Plus size={32} className="text-primary mb-3" />
            <h6 className="fw-bold text-dark">Create New Menu</h6>
            <p className="text-muted small mb-0">Add new navigation items to your site</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="quick-action-card text-center">
            <Users size={32} className="text-success mb-3" />
            <h6 className="fw-bold text-dark">Manage Users</h6>
            <p className="text-muted small mb-0">Control user access and permissions</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="quick-action-card text-center">
            <BarChart3 size={32} className="text-info mb-3" />
            <h6 className="fw-bold text-dark">View Reports</h6>
            <p className="text-muted small mb-0">Analyze performance and user data</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}