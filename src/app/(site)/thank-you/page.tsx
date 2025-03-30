import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-lime-600 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Cảm ơn bạn đã đặt hàng!</h1>
      <p className="text-gray-600 mb-8">
        Đơn hàng của bạn đã được tiếp nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
      </p>
      <Link 
        href="/"
        className="inline-block bg-lime-600 text-white px-6 py-3 rounded-lg hover:bg-lime-700"
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );
} 