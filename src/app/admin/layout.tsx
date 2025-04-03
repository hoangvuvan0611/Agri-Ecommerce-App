'use client';
import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Sản phẩm', href: '/admin/products', icon: Package },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Người dùng', href: '/admin/users', icon: Users },
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
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-xl font-bold ${!isSidebarOpen && 'hidden'}`}>
              Admin Panel
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-lime-100 text-lime-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut className="w-6 h-6" />
              <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                Đăng xuất
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find((item) => item.href === pathname)?.name ||
                  'Dashboard'}
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 