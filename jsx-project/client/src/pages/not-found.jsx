import { Container, Card } from "react-bootstrap";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="w-100" style={{maxWidth: '400px'}}>
        <Card.Body className="text-center">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <AlertCircle size={32} className="text-danger me-2" />
            <h1 className="h3 mb-0">404 Page Not Found</h1>
          </div>
          <p className="text-muted">
            Did you forget to add the page to the router?
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}