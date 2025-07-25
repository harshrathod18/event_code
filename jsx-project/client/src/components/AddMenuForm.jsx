import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import { Form, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { CloudUpload } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { insertMenuItemSchema } from "@shared/schema";

const formSchema = insertMenuItemSchema.extend({
  orderNo: z.coerce.number().min(0).default(0),
});

export default function AddMenuForm({ initialData, isEdit = false }) {
  const [, setLocation] = useLocation();
  const [showAlert, setShowAlert] = useState(null);
  const queryClient = useQueryClient();

  const { data: menuItems = [] } = useQuery({
    queryKey: ["/api/menu-items"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: initialData?.menuName || "",
      icon: initialData?.icon || "",
      menuLink: initialData?.menuLink || "",
      orderNo: initialData?.orderNo || 0,
      parentMenuId: initialData?.parentMenuId || "",
      menuStatus: initialData?.menuStatus ?? true,
      isSubmenu: initialData?.isSubmenu ?? false,
      pageStatus: initialData?.pageStatus ?? true,
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      if (isEdit && initialData) {
        return await apiRequest("PUT", `/api/menu-items/${initialData.id}`, data);
      } else {
        return await apiRequest("POST", "/api/menu-items", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      setShowAlert({ type: "success", message: isEdit ? "Menu updated successfully!" : "Menu created successfully!" });
      if (!isEdit) {
        reset();
      }
      setTimeout(() => {
        setLocation("/menu-list");
      }, 1500);
    },
    onError: (error) => {
      setShowAlert({ type: "danger", message: "Failed to save menu item. Please try again." });
    },
  });

  const onSubmit = (data) => {
    // Clean up data
    const cleanData = {
      ...data,
      parentMenuId: data.parentMenuId || null,
      orderNo: Number(data.orderNo),
    };
    createMutation.mutate(cleanData);
  };

  const parentMenus = menuItems.filter(item => !item.isSubmenu);

  return (
    <Card className="form-container">
      <Card.Header>
        <Card.Title className="mb-0">
          {isEdit ? "Edit Menu Item" : "Add New Menu Item"}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert variant={showAlert.type} dismissible onClose={() => setShowAlert(null)}>
            {showAlert.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Menu Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter menu name"
                  {...register("menuName")}
                  isInvalid={!!errors.menuName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.menuName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Icon</Form.Label>
                <Form.Select {...register("icon")}>
                  <option value="">Select an icon</option>
                  <option value="home">Home</option>
                  <option value="users">Users</option>
                  <option value="settings">Settings</option>
                  <option value="menu">Menu</option>
                  <option value="dashboard">Dashboard</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Menu Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., /dashboard, /users"
                  {...register("menuLink")}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Order Number</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("orderNo")}
                  isInvalid={!!errors.orderNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderNo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Parent Menu</Form.Label>
                <Form.Select {...register("parentMenuId")}>
                  <option value="">No Parent (Top Level)</option>
                  {parentMenus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.menuName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageUrl")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="menuStatus"
                  label="Menu Status (Active)"
                  {...register("menuStatus")}
                  defaultChecked={watch("menuStatus")}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="isSubmenu"
                  label="Is Submenu"
                  {...register("isSubmenu")}
                  defaultChecked={watch("isSubmenu")}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="pageStatus"
                  label="Page Status (Active)"
                  {...register("pageStatus")}
                  defaultChecked={watch("pageStatus")}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 justify-content-end">
            <Button 
              variant="outline-secondary" 
              type="button" 
              onClick={() => setLocation("/menu-list")}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting || createMutation.isPending}
            >
              {(isSubmitting || createMutation.isPending) ? "Saving..." : (isEdit ? "Update Menu" : "Create Menu")}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}