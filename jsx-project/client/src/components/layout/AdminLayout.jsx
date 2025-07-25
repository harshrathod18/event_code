import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex h-100">
      <Sidebar />
      <div className="flex-fill d-flex flex-column">
        <TopNavbar />
        <main className="flex-fill main-content fade-in">
          <Container fluid>
            {children}
          </Container>
        </main>
        <footer className="bg-primary-custom text-white text-center py-2">
          <small>© 2024 NxApps. All rights reserved.</small>
        </footer>
      </div>
    </div>
  );
}