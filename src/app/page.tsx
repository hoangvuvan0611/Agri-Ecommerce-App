import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Header } from '@/components/layout/header';

const products = [
  { id: 1, name: 'Nho xanh', price: 250000, image: '/api/placeholder/200/200' },
  { id: 2, name: 'Đào', price: 180000, image: '/api/placeholder/200/200' },
  { id: 3, name: 'Chanh dây', price: 120000, image: '/api/placeholder/200/200' },
  { id: 4, name: 'Chuối', price: 80000, image: '/api/placeholder/200/200' },
  { id: 5, name: 'Dưa leo', price: 45000, image: '/api/placeholder/200/200' },
  { id: 6, name: 'Ớt', price: 35000, image: '/api/placeholder/200/200' },
  { id: 7, name: 'Dừa', price: 40000, image: '/api/placeholder/200/200' },
  { id: 8, name: 'Bông cải', price: 65000, image: '/api/placeholder/200/200' },
  { id: 9, name: 'Cà chua', price: 55000, image: '/api/placeholder/200/200' },
  { id: 10, name: 'Lựu', price: 150000, image: '/api/placeholder/200/200' },
];

export default function FruitStorePage () {
  return (
    <div className="container relative mx-auto px-4">
      {/* Header */}
      <div className='sticky top-0 bg-white z-99'>
        <Header/>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Trang trại Thực phẩm<br />tươi sạch & 100% Hữu cơ</h1>
          <Button className="bg-green-600 hover:bg-green-700">Mua Ngay</Button>
        </div>
        <div className="bg-orange-300 p-8 rounded-lg text-white">
          <h2 className="text-2xl font-bold">30% SALE OFF</h2>
          <p>Spring Fresh Deal</p>
          <Button variant="outline" className="mt-4 text-white border-white hover:bg-white hover:text-orange-300">
            Mua Ngay
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {['Tươi sạch', 'Hữu cơ', 'Chất lượng', 'Tự nhiên'].map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-full" />
            </div>
            <span className="font-medium">{feature}</span>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <CardContent className="p-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <h3 className="mt-2 font-medium">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold">{product.price.toLocaleString()}đ</span>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-gray-100 p-4 rounded-lg my-8 text-center">
        <h3 className="text-xl font-bold">20% OFF</h3>
        <p>Rau quả bảo bảo cơ</p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h4 className="font-bold mb-2">MonaFruit</h4>
            <p>107/23 Cách Mạng Tháng 8, Q.10, TP.HCM</p>
            <p>(+84) 093-787-387</p>
            <p>info@monna.global</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Liên kết</h4>
            <ul className="space-y-2">
              <li>Chính sách giao hàng</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách hoàn trả</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};