'use client';
import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, LogOut, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import Image from 'next/image';

const menuItems = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Sản phẩm', href: '/admin/products', icon: Package },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Người dùng', href: '/admin/users', icon: Users },
  { name: 'Shipping', href: '/admin/addresses', icon: MapPin },
  { name: 'Thống kê', href: '/admin/statistics', icon: BarChart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-md transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl font-bold">
              {isSidebarOpen ? 'Admin' : 'A'}
            </span>
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-4 ${
                  isActive
                    ? 'bg-lime-50 text-lime-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="flex items-center p-4 text-gray-600 hover:bg-gray-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.href === pathname)?.name ||
                'Admin Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 