import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import MenuList from "@/pages/MenuList";
import AddMenu from "@/pages/AddMenu";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/menu-list" component={MenuList} />
        <Route path="/add-menu" component={AddMenu} />
        <Route path="/menu-edit/:id" component={AddMenu} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
