'use client';

import { Button } from "@/components/ui/button";
import { activityLogService } from "@/services/activityLogService";
import { useState } from "react";

interface CartButtonProps {
  productId: string;
  price: number;
  onAddToCart: (quantity: number) => Promise<void>;
}

export function CartButton({ productId, price, onAddToCart }: CartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      // Gọi API lưu hành động thêm vào giỏ hàng
      await activityLogService.logCartAction('add_to_cart', productId, 1, price);
      // Thực hiện thêm vào giỏ hàng
      await onAddToCart(1);
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-lime-600 hover:bg-lime-700"
    >
      {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
    </Button>
  );
} 