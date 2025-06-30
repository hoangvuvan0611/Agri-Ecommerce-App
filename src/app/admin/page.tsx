'use client';
import { Card } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { orderService, productService } from '@/services/admin';
import { Order } from '@/types/admin';
import Image from 'next/image';
import { Product } from '@/types/admin';


export default function AdminDashboard() {

  const [ stats, setStats ] = useState([]);
  // Danh sach don hang gan day
  const [ orders, setOrders ] = useState<Order[]>([]);
  // Danh sach san sam ban chay nhat
  const [ products, setProducts ] = useState<Product[]>([]);

  useEffect(() => {
    // Goi lay thong tin san pham
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
    };

    // Goi lay thong tin danh sach cac don hang gan day
    const getOrders = async () => {
      const dataOrder = await orderService.getListShow();
      setOrders(dataOrder || []);
    };
    const getProducts = async () => {
      const dataProducts = await productService.getListBestSeller();
      setProducts(dataProducts || []);
    };

    // Goi lay thong tin tong quan
    getStats();
    // Goi lay thong tin don hang gan day
    getOrders();
    getProducts();
  }, []);

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
                <th className="pb-4">Tên khách hàng</th>
                <th className="pb-4">Tổng tiền</th>
                <th className="pb-4">Trạng thái</th>
                <th className="pb-4">Thời gian tạo</th>
                <th className="pb-4">Thời gian cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-4">{order?.id}</td>
                  <td className="py-4">{order?.customerName}</td>
                  <td className="py-4">{order?.totalFee.toLocaleString("vi-VN")}đ</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {order.status === 'PENDING' ? 'Chờ xử lý' :
                       order.status === 'PROCESSING' ? 'Đang xử lý' :
                       order.status === 'COMPLETED' ? 'Hoàn thành' :
                       'Đã hủy'}
                    </span>
                  </td>
                  <td className="py-4">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="py-4">{new Date(order.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Products */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
                  alt="Product"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Sản phẩm {product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Đã bán: {product.quantity || 0}</p>
                <p className="text-lime-600 font-semibold mt-2">
                  {product.originalPrice.toLocaleString("vi-VN") || 0 + 'đ'   }
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 