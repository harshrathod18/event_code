import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-gray-100">
          {children}
        </main>
        <footer className="bg-primary text-white text-center text-sm py-3">
          © 2024 NxApps. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
