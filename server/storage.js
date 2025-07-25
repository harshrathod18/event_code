import { randomUUID } from "crypto";

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    
    // Initialize with some sample menu items
    this.seedMenuItems();
  }

  seedMenuItems() {
    const sampleMenus = [
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

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData) {
    const id = randomUUID();
    const user = {
      id,
      ...userData,
    };
    this.users.set(id, user);
    return user;
  }

  async getMenuItems() {
    return Array.from(this.menuItems.values()).sort((a, b) => a.orderNo - b.orderNo);
  }

  async getMenuItem(id) {
    return this.menuItems.get(id);
  }

  async createMenuItem(menuItemData) {
    const id = randomUUID();
    const menuItem = {
      id,
      ...menuItemData,
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id, menuItemData) {
    const existingMenuItem = this.menuItems.get(id);
    if (!existingMenuItem) {
      return undefined;
    }

    const updatedMenuItem = {
      ...existingMenuItem,
      ...menuItemData,
    };
    this.menuItems.set(id, updatedMenuItem);
    return updatedMenuItem;
  }

  async deleteMenuItem(id) {
    return this.menuItems.delete(id);
  }
}

export const storage = new MemStorage();