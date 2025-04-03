'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye, Check, X } from 'lucide-react';

interface Order {
  id: number;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 1,
    customer: 'Nguyễn Văn A',
    total: 250000,
    status: 'pending',
    date: '12/04/2024',
    items: 3,
  },
  {
    id: 2,
    customer: 'Trần Thị B',
    total: 350000,
    status: 'processing',
    date: '11/04/2024',
    items: 5,
  },
  {
    id: 3,
    customer: 'Lê Văn C',
    total: 150000,
    status: 'completed',
    date: '10/04/2024',
    items: 2,
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy',
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleStatusChange = (id: number, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Lọc</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#ORD-{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-lime-100"
                      >
                        <Eye className="w-4 h-4 text-lime-600" />
                      </Button>
                      {order.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-green-100"
                            onClick={() => handleStatusChange(order.id, 'processing')}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      {order.status === 'processing' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-green-100"
                          onClick={() => handleStatusChange(order.id, 'completed')}
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Hiển thị {filteredOrders.length} trong tổng số {orders.length} đơn
            hàng
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Trước
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 