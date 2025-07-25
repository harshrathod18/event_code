import { Menu, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TopNavbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">Open user menu</span>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-white text-sm font-medium">
                T
              </AvatarFallback>
            </Avatar>
            <span className="ml-2 text-gray-700 font-medium">Talebda</span>
            <ChevronDown className="ml-2 w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
