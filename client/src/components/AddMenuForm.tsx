import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMenuItemSchema } from "@shared/schema";
import type { MenuItem } from "@shared/schema";

const formSchema = insertMenuItemSchema.extend({
  orderNo: z.coerce.number().min(0).default(0),
});

type FormValues = z.infer<typeof formSchema>;

interface AddMenuFormProps {
  initialData?: MenuItem;
  isEdit?: boolean;
}

export default function AddMenuForm({ initialData, isEdit = false }: AddMenuFormProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: initialData?.menuName || "",
      icon: initialData?.icon || "",
      menuLink: initialData?.menuLink || "",
      orderNo: initialData?.orderNo || 0,
      parentMenuId: initialData?.parentMenuId || null,
      menuStatus: initialData?.menuStatus ?? true,
      isSubmenu: initialData?.isSubmenu ?? false,
      pageStatus: initialData?.pageStatus ?? true,
      imageUrl: initialData?.imageUrl || null,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (isEdit && initialData) {
        return await apiRequest("PUT", `/api/menu-items/${initialData.id}`, data);
      } else {
        return await apiRequest("POST", "/api/menu-items", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({
        title: "Success",
        description: `Menu item ${isEdit ? "updated" : "created"} successfully.`,
      });
      setLocation("/menu-list");
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} menu item.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data);
  };

  const handleCancel = () => {
    setLocation("/menu-list");
  };

  // Filter out current item from parent options when editing
  const parentOptions = menuItems.filter(item => 
    !isEdit || item.id !== initialData?.id
  );

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Parent Menu Selection */}
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="parentMenuId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Parent Menu (optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Parent Menu (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No Parent Menu</SelectItem>
                          {parentOptions.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                              {menu.menuName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Menu Name */}
              <FormField
                control={form.control}
                name="menuName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Menu Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter menu name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Icon */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., home, users, settings" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Menu Link */}
              <FormField
                control={form.control}
                name="menuLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Link</FormLabel>
                    <FormControl>
                      <Input placeholder="/admin/dashboard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order No */}
              <FormField
                control={form.control}
                name="orderNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order No</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Menu Image Upload */}
              <div className="lg:col-span-2">
                <FormLabel>Menu Image</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <CloudUpload className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <Button type="button" variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-8">
                  {/* Menu Status */}
                  <FormField
                    control={form.control}
                    name="menuStatus"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormLabel className="text-sm font-medium">Menu Status</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Is Submenu */}
                  <FormField
                    control={form.control}
                    name="isSubmenu"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormLabel className="text-sm font-medium">Is Submenu</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Page Status */}
                  <FormField
                    control={form.control}
                    name="pageStatus"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormLabel className="text-sm font-medium">Page Status</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={handleCancel}>
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {createMutation.isPending ? "Saving..." : "SAVE"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
