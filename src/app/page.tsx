import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Nho xanh",
    price: 320000,
    image: "/fruits/grape.png",
  },
  {
    id: "2", 
    name: "Đào",
    price: 180000,
    image: "/fruits/peach.png",
  },
  // Thêm các sản phẩm khác
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-green-600">Meta Fruit</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-sm font-medium">Trang chủ</a>
              <a href="#" className="text-sm font-medium">Sản phẩm</a>
              <a href="#" className="text-sm font-medium">Giới thiệu</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Trang trại thực phẩm tươi sạch & 100% hữu cơ
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi cung cấp những sản phẩm hữu cơ tốt nhất
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              Xem ngay
            </Button>
          </div>
          <div className="relative h-96 bg-gray-100 rounded-lg">
            {/* Add hero image here */}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8">Sản phẩm chất lượng</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square">
                {/* Add product image here */}
              </div>
              <div className="p-4">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Button size="sm" variant="outline">
                    Thêm vào giỏ
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}