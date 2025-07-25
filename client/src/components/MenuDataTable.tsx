import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Search, Home, Users, Settings, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MenuItem } from "@shared/schema";

interface MenuDataTableProps {
  menuItems: MenuItem[];
  isLoading: boolean;
}

export default function MenuDataTable({ menuItems, isLoading }: MenuDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/menu-items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({
        title: "Success",
        description: "Menu item deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete menu item.",
        variant: "destructive",
      });
    },
  });

  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case "home":
        return <Home className="w-4 h-4 text-gray-400" />;
      case "users":
        return <Users className="w-4 h-4 text-gray-400" />;
      case "settings":
        return <Settings className="w-4 h-4 text-gray-400" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.menuName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && item.menuStatus) ||
      (statusFilter === "inactive" && !item.menuStatus);
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredMenuItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Table Controls */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menus..."
                  className="w-64 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredMenuItems.length && filteredMenuItems.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Sr No</TableHead>
                <TableHead>Menu Name</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submenus</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMenuItems.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-900">{item.menuName}</TableCell>
                  <TableCell>{getIconComponent(item.icon)}</TableCell>
                  <TableCell className="text-sm text-gray-500">{item.menuLink || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.menuStatus ? "default" : "secondary"}
                      className={item.menuStatus ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                    >
                      {item.menuStatus ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {item.isSubmenu ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/menu-edit/${item.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary-dark"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredMenuItems.length}</span> of{" "}
              <span className="font-medium">{filteredMenuItems.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
