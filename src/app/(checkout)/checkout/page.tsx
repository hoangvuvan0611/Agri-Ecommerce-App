'use client';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axiosInstance from '@/utils/axiosInstance';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
    setIsLoading(true);

    try {
      if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
        toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
      }

      const orderData = {
        shippingInfo,
        paymentMethod,
        items,
        totalAmount: totalPrice,
      };

      const response = await axiosInstance.post('/api/v1/orders', orderData);

      if (response.data) {
        toast.success('Đặt hàng thành công!');
        clearCart();
        window.location.href = '/thank-you';
      }
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner Section */}
      <div className='relative w-full h-[100px] mb-4 rounded-2xl overflow-hidden'>
        <Image
            src={`/images/organic-breadcrumb.png`}
            alt={"Organic Farm"}
            fill
            className='object-cover object-center rounded-2xl'
            priority
            quality={100}
        />
        {/* Overlay với breadcrumb */}
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
        <div className='text-white space-y-2 text-center'>
            <div className='flex items-center gap-2 text-sm'>
            <Link href="/" className='hover:text-green-400 transition-colors'>
                Trang chủ
            </Link>
            <span>›</span>
            <Link href="/product" className='text-lime-400 transition-colors'>
              Thanh toán
            </Link>
            </div>
        </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-4">Giỏ hàng của bạn đang trống</h2>
          <Link 
            href="/product" 
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin sản phẩm */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-6">Giỏ hàng của bạn</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b">
                    <div className="relative w-24 h-24">
                      <Image
                        src={`http://116.104.51.101:8080/agri-shop/${item.path}`}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-2 text-gray-600">
                        {(item.salePrice || item.originalPrice).toLocaleString('vi-VN')}₫
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-semibold text-lime-600">
                          {((item.salePrice || item.originalPrice) * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form thông tin giao hàng */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Họ tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tỉnh/Thành phố</label>
                    <Input
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quận/Huyện</label>
                    <Input
                      name="district"
                      value={shippingInfo.district}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phường/Xã</label>
                    <Input
                      name="ward"
                      value={shippingInfo.ward}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ghi chú</label>
                  <textarea
                    name="note"
                    value={shippingInfo.note}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Tổng quan đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Tổng quan đơn hàng</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({items.length} sản phẩm)</span>
                  <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Tổng cộng</span>
                    <span className="text-xl font-bold text-lime-600">
                      {totalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="space-y-3">
                  <h3 className="font-medium">Phương thức thanh toán</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-lime-600"
                      />
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-lime-600"
                      />
                      <span>Chuyển khoản ngân hàng</span>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || items.length === 0}
                  className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-lg"
                >
                  {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 