import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Header } from '@/components/layout/header';
import HeroSection from '@/components/layout/hero';
import Features from '@/components/common/features';

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
    <div className="">
      {/* Hero Section */}
      <HeroSection/>

      <section className='container'>
        {/* Features */}
        <Features/>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="group">
              <CardContent className="p-4">
                <div className="relative z-0">
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
      </section>

    </div>
  );
};