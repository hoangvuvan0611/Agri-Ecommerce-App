'use client';
import { useCart } from '@/contexts/CartContext';
import { BaggageClaim, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
    setIsOpen(false);
    router.push('/checkout');
  };

  useEffect(() => {
    console.log(items)
  }, [])

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:text-lime-600 transition-colors"
      >
        <BaggageClaim className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-lime-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-screen sm:w-full sm:max-w-sm xl:w-96 px-4 sm:px-0 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Giỏ hàng ({totalItems})</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Giỏ hàng trống</p>
            ) : (
              <>
                <div className="max-h-96 overflow-auto space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-2 border-b">
                      <div className="relative aspect-square w-16 sm:w-20 flex-shrink-0">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${item?.path}`}
                          alt={item.name}
                          unoptimized
                          fill
                          quality={100}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border rounded"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-lime-600 whitespace-nowrap">
                            {((item.salePrice || item.originalPrice) * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Tổng tiền:</span>
                    <span className="font-bold text-lime-600">
                      {totalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-2 border border-lime-600 text-lime-600 rounded-lg hover:bg-lime-50 transition-colors"
                    >
                      Tiếp tục mua
                    </button>
                    <button 
                      onClick={handleCheckout}
                      className="flex-1 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 