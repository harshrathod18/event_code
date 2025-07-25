import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import MenuDataTable from "@/components/MenuDataTable";
import type { MenuItem } from "@shared/schema";

export default function MenuList() {
  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Menu List</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your navigation menu items
          </p>
        </div>
        <Link href="/add-menu">
          <Button className="inline-flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            ADD MENU
          </Button>
        </Link>
      </div>

      {/* Menu Data Table */}
      <MenuDataTable menuItems={menuItems} isLoading={isLoading} />
    </div>
  );
}
