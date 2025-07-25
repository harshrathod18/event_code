import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import AddMenuForm from "../components/AddMenuForm";

export default function AddMenu() {
  const [location] = useLocation();
  const isEdit = location.includes("/menu-edit/");
  const menuId = isEdit ? location.split("/menu-edit/")[1] : null;

  const { data: menuItem, isLoading } = useQuery({
    queryKey: ["/api/menu-items", menuId],
    enabled: !!menuId,
  });

  return (
    <Container fluid className="py-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h2 mb-1">
              {isEdit ? "Edit Menu" : "Add Menu"}
            </h1>
            <p className="text-muted">
              {isEdit ? "Update menu item details" : "Create a new navigation menu item"}
            </p>
          </div>
          <Button
            variant="outline-primary"
            onClick={() => window.history.back()}
            className="d-flex align-items-center"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to List
          </Button>
        </Col>
      </Row>

      {/* Add/Edit Menu Form */}
      <Row>
        <Col>
          {!isEdit || !isLoading ? (
            <AddMenuForm initialData={menuItem} isEdit={isEdit} />
          ) : (
            <Card className="form-container">
              <Card.Body className="text-center">
                <Spinner animation="border" role="status" className="mb-3">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="text-muted">Loading menu details...</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}