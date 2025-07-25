import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AddMenuForm from "@/components/AddMenuForm";
import type { MenuItem } from "@shared/schema";

export default function AddMenu() {
  const [location] = useLocation();
  const isEdit = location.includes("/menu-edit/");
  const menuId = isEdit ? location.split("/menu-edit/")[1] : null;

  const { data: menuItem, isLoading } = useQuery<MenuItem>({
    queryKey: ["/api/menu-items", menuId],
    enabled: !!menuId,
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Menu" : "Add Menu"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {isEdit ? "Update menu item details" : "Create a new navigation menu item"}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>
      </div>

      {/* Add/Edit Menu Form */}
      {!isEdit || !isLoading ? (
        <AddMenuForm initialData={menuItem} isEdit={isEdit} />
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
}
