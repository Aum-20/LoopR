
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TopNav = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* User Avatar */}
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-green-600 text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
