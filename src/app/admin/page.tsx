'use client';
import { Card } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import products from '../page/products';
import { productService } from '@/services/admin';


export default function AdminDashboard() {

  const [ stats, setStats ] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      const numProducts = await productService.getTotalProducts();
      const statsTemp = [
        {
          title: 'Tổng sản phẩm',
          value: `${numProducts || 0}`,
          icon: Package,
          change: '+12%',
          changeType: 'positive',
        },
        {
          title: 'Đơn hàng mới',
          value: '56',
          icon: ShoppingCart,
          change: '+5%',
          changeType: 'positive',
        },
        {
          title: 'Người dùng mới',
          value: '89',
          icon: Users,
          change: '+8%',
          changeType: 'positive',
        },
        {
          title: 'Doanh thu',
          value: '45.2M',
          icon: TrendingUp,
          change: '+15%',
          changeType: 'positive',
        },
      ];

      setStats(statsTemp);
    }

    getStats();
  }, [products]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-lime-100 rounded-lg">
                  <Icon className="w-6 h-6 text-lime-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="pb-4">Mã đơn hàng</th>
                <th className="pb-4">Khách hàng</th>
                <th className="pb-4">Tổng tiền</th>
                <th className="pb-4">Trạng thái</th>
                <th className="pb-4">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((order) => (
                <tr key={order} className="border-t">
                  <td className="py-4">#ORD-{order}</td>
                  <td className="py-4">Nguyễn Văn A</td>
                  <td className="py-4">1,234,000₫</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Đã giao
                    </span>
                  </td>
                  <td className="py-4">12/04/2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Products */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <div
              key={product}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src="https://via.placeholder.com/300"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Sản phẩm {product}</h3>
                <p className="text-sm text-gray-600 mt-1">Đã bán: 123</p>
                <p className="text-lime-600 font-semibold mt-2">
                  1,234,000₫
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 