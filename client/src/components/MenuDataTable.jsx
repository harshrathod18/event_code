import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Table, 
  Form, 
  Button, 
  Badge, 
  Card, 
  Row, 
  Col, 
  InputGroup,
  Alert,
  Modal,
  Spinner
} from "react-bootstrap";
import { Edit, Trash2, Search, Home, Users, Settings, MoreHorizontal } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { formatStatus } from "../lib/utils";

export default function MenuDataTable({ menuItems, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/menu-items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      setShowAlert({ type: "success", message: "Menu item deleted successfully." });
      setShowDeleteModal(false);
      setItemToDelete(null);
    },
    onError: () => {
      setShowAlert({ type: "danger", message: "Failed to delete menu item." });
      setShowDeleteModal(false);
    },
  });

  const getIconComponent = (iconName) => {
    const iconProps = { size: 16, className: "text-muted" };
    switch (iconName) {
      case "home":
        return <Home {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <MoreHorizontal {...iconProps} />;
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.menuName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && item.menuStatus) ||
      (statusFilter === "inactive" && !item.menuStatus);
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredMenuItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id);
    }
  };

  if (isLoading) {
    return (
      <Card className="table-container">
        <Card.Body className="text-center p-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-muted">Loading menu items...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="table-container">
        <Card.Header>
          <Row className="align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
            <Col md={3} className="text-end">
              {selectedItems.length > 0 && (
                <Button variant="outline-danger" size="sm">
                  Delete Selected ({selectedItems.length})
                </Button>
              )}
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          {showAlert && (
            <Alert variant={showAlert.type} dismissible onClose={() => setShowAlert(null)} className="m-3 mb-0">
              {showAlert.message}
            </Alert>
          )}

          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedItems.length === filteredMenuItems.length && filteredMenuItems.length > 0}
                  />
                </th>
                <th>Icon</th>
                <th>Menu Name</th>
                <th>Menu Link</th>
                <th>Order</th>
                <th>Status</th>
                <th>Submenu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenuItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    {searchTerm ? "No menu items match your search" : "No menu items found"}
                  </td>
                </tr>
              ) : (
                filteredMenuItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                      />
                    </td>
                    <td>{getIconComponent(item.icon)}</td>
                    <td className="fw-medium">{item.menuName}</td>
                    <td>
                      <code className="text-muted small">{item.menuLink || "-"}</code>
                    </td>
                    <td>{item.orderNo}</td>
                    <td>
                      <Badge 
                        bg={item.menuStatus ? "success" : "warning"}
                        className="status-badge"
                      >
                        {formatStatus(item.menuStatus)}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={item.isSubmenu ? "info" : "secondary"} className="status-badge">
                        {item.isSubmenu ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link href={`/menu-edit/${item.id}`}>
                          <Button variant="outline-primary" size="sm">
                            <Edit size={14} />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(item)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>

        {filteredMenuItems.length > 0 && (
          <Card.Footer className="text-muted small">
            Showing {filteredMenuItems.length} of {menuItems.length} menu items
          </Card.Footer>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the menu item "{itemToDelete?.menuName}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}