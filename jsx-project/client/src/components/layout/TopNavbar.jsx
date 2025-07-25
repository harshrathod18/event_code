import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Menu, ChevronDown, User } from "lucide-react";

export default function TopNavbar() {
  return (
    <Navbar className="top-navbar px-3" expand="lg">
      <div className="d-flex align-items-center">
        <button className="btn btn-link d-lg-none p-2 text-muted">
          <Menu size={20} />
        </button>
      </div>

      <Nav className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="d-flex align-items-center text-decoration-none text-dark"
            id="user-dropdown"
          >
            <div className="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
              <User size={16} />
            </div>
            <span className="fw-medium">Talebda</span>
            <ChevronDown size={16} className="ms-2 text-muted" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}