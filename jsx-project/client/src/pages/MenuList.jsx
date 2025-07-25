import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import MenuDataTable from "../components/MenuDataTable";

export default function MenuList() {
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["/api/menu-items"],
  });

  return (
    <Container fluid className="py-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h2 mb-1">Menu List</h1>
            <p className="text-muted">Manage your navigation menu items</p>
          </div>
          <Link href="/add-menu">
            <Button variant="primary" className="d-flex align-items-center">
              <Plus size={16} className="me-2" />
              ADD MENU
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Menu Data Table */}
      <Row>
        <Col>
          <MenuDataTable menuItems={menuItems} isLoading={isLoading} />
        </Col>
      </Row>
    </Container>
  );
}