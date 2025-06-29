
import { 
  Home, 
  ArrowLeft, 
  ArrowRight, 
  Wallet, 
  BarChart, 
  User, 
  Bell, 
  Settings 
} from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Transactions", icon: ArrowLeft },
    { name: "Wallet", icon: Wallet },
    { name: "Analytics", icon: BarChart },
    { name: "Personal", icon: User },
    { name: "Message", icon: Bell },
    { name: "Setting", icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="ml-3 text-xl font-bold text-white">Penta</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors ${
                  activeItem === item.name
                    ? "bg-green-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
