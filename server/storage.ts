import { type User, type InsertUser, type MenuItem, type InsertMenuItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu item operations
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, menuItem: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private menuItems: Map<string, MenuItem>;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    
    // Initialize with some sample menu items
    this.seedMenuItems();
  }

  private seedMenuItems() {
    const sampleMenus: MenuItem[] = [
      {
        id: "1",
        menuName: "Dashboard",
        icon: "home",
        menuLink: "/admin/dashboard",
        orderNo: 1,
        parentMenuId: null,
        menuStatus: true,
        isSubmenu: false,
        pageStatus: true,
        imageUrl: null,
      },
      {
        id: "2",
        menuName: "Users",
        icon: "users",
        menuLink: "/admin/users",
        orderNo: 2,
        parentMenuId: null,
        menuStatus: true,
        isSubmenu: false,
        pageStatus: true,
        imageUrl: null,
      },
      {
        id: "3",
        menuName: "Settings",
        icon: "settings",
        menuLink: "/admin/settings",
        orderNo: 3,
        parentMenuId: null,
        menuStatus: false,
        isSubmenu: false,
        pageStatus: true,
        imageUrl: null,
      },
    ];

    sampleMenus.forEach(menu => {
      this.menuItems.set(menu.id, menu);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0));
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = { ...insertMenuItem, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id: string, updates: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const existing = this.menuItems.get(id);
    if (!existing) return undefined;
    
    const updated: MenuItem = { ...existing, ...updates };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    return this.menuItems.delete(id);
  }
}

export const storage = new MemStorage();
