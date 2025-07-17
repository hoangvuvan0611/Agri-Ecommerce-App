'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orderService } from '@/services/admin';
import { Order } from '@/types/admin';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: Props) {
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
      const data = await orderService.getDetailById(params.id);
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
      if (status === 'CANCELLED') {
        updatedOrder = await orderService.cancelOrder(order.id);
      } else if (status === 'COMPLETED') {
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

  // const handleUpdateDelivery = async (deliveryInfo: {
  //   delivery_at: string;
  //   shipping_fee: number;
  //   delivery_info_id: number;
  // }) => {
  //   if (!order) return;

  //   try {
  //     const updatedOrder = await orderService.updateDeliveryInfo(order.id, deliveryInfo);
  //     setOrder(updatedOrder);
  //     toast.success('Cập nhật thông tin giao hàng thành công');
  //   } catch (error) {
  //     console.error('Error updating delivery info:', error);
  //     toast.error('Không thể cập nhật thông tin giao hàng');
  //   }
  // };

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
                  order.status === 'PENDING' ? 'warning' :
                  order.status === 'PROCESSING' ? 'info' :
                  order.status === 'COMPLETED' ? 'success' :
                  'destructive'
                }>
                  {order.status === 'PENDING' ? 'Chờ xử lý' :
                   order.status === 'PROCESSING' ? 'Đang xử lý' :
                   order.status === 'COMPLETED' ? 'Hoàn thành' :
                   'Đã hủy'}
                </Badge>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ngày đặt</div>
              <div className="mt-1">
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            {order.deliveryAt && (
              <div>
                <div className="text-sm text-gray-500">Ngày giao hàng</div>
                <div className="mt-1">
                  {new Date(order.deliveryAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            {order.canceledAt && (
              <div>
                <div className="text-sm text-gray-500">Ngày hủy</div>
                <div className="mt-1">
                  {new Date(order.canceledAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            {order.completedAt && (
              <div>
                <div className="text-sm text-gray-500">Ngày hoàn thành</div>
                <div className="mt-1">
                  {new Date(order.completedAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500">Phí giao hàng</div>
              <div className="mt-1">
                {order?.shippingFee?.toLocaleString('vi-VN') || 0}đ
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tổng tiền</div>
              <div className="mt-1 font-semibold">
                {order.totalFee.toLocaleString('vi-VN') || 0}đ
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
              <div className="mt-1">{order?.customer?.username}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="mt-1">{order?.customer?.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Số điện thoại</div>
              <div className="mt-1">{order?.customer?.phoneNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Địa chỉ giao hàng</div>
              <div className="mt-1">{order?.customer?.address}</div>
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
                <th className="text-left py-2">Ảnh</th>
                <th className="text-left py-2">Tên sản phẩm</th>
                <th className="text-left py-2">Đơn giá</th>
                <th className="text-left py-2">Số lượng</th>
                <th className="text-left py-2">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItemList?.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${item?.path}`}
                        unoptimized
                        alt={item.productName}
                        width={84}
                        height={84}
                        quality={100}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="text-left text-base font-bold">
                    {item.productName}
                  </td>
                  <td className="text-left">
                    {item.price.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="text-left">{item.quantity}</td>
                  <td className="text-left">
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
                  {(order?.totalFee - order.shippingFee).toLocaleString('vi-VN')}đ
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right font-semibold py-4">
                  Phí giao hàng
                </td>
                <td className="text-right font-semibold py-4">
                  {order?.shippingFee?.toLocaleString('vi-VN') || 0}đ
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right font-semibold py-4">
                  Tổng cộng
                </td>
                <td className="text-right font-semibold py-4">
                  {order?.totalFee?.toLocaleString('vi-VN')}đ
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Cập nhật trạng thái */}
      {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Cập nhật trạng thái</h2>
          <div className="flex space-x-4 cursor-pointer">
            {order.status === 'PENDING' && (
              <>
                <Button className='cursor-pointer' onClick={() => handleStatusChange('PROCESSING')}>
                  Xác nhận đơn hàng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange('CANCELLED')}
                >
                  Hủy đơn hàng
                </Button>
              </>
            )}
            {order.status === 'PROCESSING' && (
              <Button onClick={() => handleStatusChange('COMPLETED')}>
                Hoàn thành đơn hàng
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 