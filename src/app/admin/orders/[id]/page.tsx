'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orderService } from '@/services/admin';
import { Order } from '@/types/admin';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getById(Number(params.id));
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
      setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
      toast.error('Không thể tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: Order['status']) => {
    if (!order) return;

    try {
      let updatedOrder;
      if (status === 'cancelled') {
        updatedOrder = await orderService.cancelOrder(order.id);
      } else if (status === 'completed') {
        updatedOrder = await orderService.completeOrder(order.id);
      } else {
        updatedOrder = await orderService.updateStatus(order.id, status);
      }
      setOrder(updatedOrder);
      toast.success('Cập nhật trạng thái đơn hàng thành công');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  const handleUpdateDelivery = async (deliveryInfo: {
    delivery_at: string;
    shipping_fee: number;
    delivery_info_id: number;
  }) => {
    if (!order) return;

    try {
      const updatedOrder = await orderService.updateDeliveryInfo(order.id, deliveryInfo);
      setOrder(updatedOrder);
      toast.success('Cập nhật thông tin giao hàng thành công');
    } catch (error) {
      console.error('Error updating delivery info:', error);
      toast.error('Không thể cập nhật thông tin giao hàng');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <Button onClick={() => router.push('/admin/orders')}>
            Quay lại
          </Button>
        </div>
        <Card className="p-4">
          <div className="text-center text-red-500">{error}</div>
          <div className="flex justify-center mt-4">
            <Button onClick={loadOrder}>Thử lại</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <Button onClick={() => router.push('/admin/orders')}>
            Quay lại
          </Button>
        </div>
        <Card className="p-4">
          <div className="text-center">Không tìm thấy đơn hàng</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chi tiết đơn hàng #{order.id}</h1>
        <Button onClick={() => router.push('/admin/orders')}>
          Quay lại
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thông tin đơn hàng */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Trạng thái</div>
              <div className="mt-1">
                <Badge variant={
                  order.status === 'pending' ? 'warning' :
                  order.status === 'processing' ? 'info' :
                  order.status === 'completed' ? 'success' :
                  'destructive'
                }>
                  {order.status === 'pending' ? 'Chờ xử lý' :
                   order.status === 'processing' ? 'Đang xử lý' :
                   order.status === 'completed' ? 'Hoàn thành' :
                   'Đã hủy'}
                </Badge>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ngày đặt</div>
              <div className="mt-1">
                {new Date(order.created_at).toLocaleDateString('vi-VN')}
              </div>
            </div>
            {order.delivery_at && (
              <div>
                <div className="text-sm text-gray-500">Ngày giao hàng</div>
                <div className="mt-1">
                  {new Date(order.delivery_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            {order.canceled_at && (
              <div>
                <div className="text-sm text-gray-500">Ngày hủy</div>
                <div className="mt-1">
                  {new Date(order.canceled_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            {order.completed_at && (
              <div>
                <div className="text-sm text-gray-500">Ngày hoàn thành</div>
                <div className="mt-1">
                  {new Date(order.completed_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500">Phí giao hàng</div>
              <div className="mt-1">
                {order.shipping_fee.toLocaleString('vi-VN')}đ
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tổng tiền</div>
              <div className="mt-1 font-semibold">
                {order.total_fee.toLocaleString('vi-VN')}đ
              </div>
            </div>
          </div>
        </Card>

        {/* Thông tin khách hàng */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin khách hàng</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Họ tên</div>
              <div className="mt-1">{order.customer.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="mt-1">{order.customer.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Số điện thoại</div>
              <div className="mt-1">{order.customer.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Địa chỉ giao hàng</div>
              <div className="mt-1">{order.shippingAddress}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Danh sách sản phẩm */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Sản phẩm</th>
                <th className="text-right py-2">Đơn giá</th>
                <th className="text-right py-2">Số lượng</th>
                <th className="text-right py-2">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    {item.price.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right font-semibold py-4">
                  Tạm tính
                </td>
                <td className="text-right font-semibold py-4">
                  {(order.total_fee - order.shipping_fee).toLocaleString('vi-VN')}đ
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right font-semibold py-4">
                  Phí giao hàng
                </td>
                <td className="text-right font-semibold py-4">
                  {order.shipping_fee.toLocaleString('vi-VN')}đ
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right font-semibold py-4">
                  Tổng cộng
                </td>
                <td className="text-right font-semibold py-4">
                  {order.total_fee.toLocaleString('vi-VN')}đ
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Cập nhật trạng thái */}
      {order.status !== 'completed' && order.status !== 'cancelled' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Cập nhật trạng thái</h2>
          <div className="flex space-x-4">
            {order.status === 'pending' && (
              <>
                <Button onClick={() => handleStatusChange('processing')}>
                  Xác nhận đơn hàng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange('cancelled')}
                >
                  Hủy đơn hàng
                </Button>
              </>
            )}
            {order.status === 'processing' && (
              <Button onClick={() => handleStatusChange('completed')}>
                Hoàn thành đơn hàng
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 