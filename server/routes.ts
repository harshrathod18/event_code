import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Menu items routes
  app.get("/api/menu-items", async (req, res) => {
    try {
      const menuItems = await storage.getMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const menuItem = await storage.getMenuItem(id);
      
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  app.post("/api/menu-items", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const menuItem = await storage.createMenuItem(validatedData);
      res.status(201).json(menuItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  app.put("/api/menu-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const menuItem = await storage.updateMenuItem(id, validatedData);
      
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.json(menuItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  app.delete("/api/menu-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteMenuItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete menu item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
