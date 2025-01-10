import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wrench,
  Fuel,
  Circle,
  ClipboardCheck,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/maintenance', icon: Wrench, label: 'Manutenção' },
  { path: '/fuel', icon: Fuel, label: 'Abastecimento' },
  { path: '/tires', icon: Circle, label: 'Pneus' },
  { path: '/checklist', icon: ClipboardCheck, label: 'Checklist' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">Gestão de Frota</h1>
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto" size={16} />}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}