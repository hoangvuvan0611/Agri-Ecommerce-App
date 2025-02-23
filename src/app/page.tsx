import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import HeroSection from '@/components/layout/hero';
import Features from './page/features';
import ProductsIntro from './page/products';

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

        <ProductsIntro image={'/images/organic-product-banner-intro-1.png'} products={products} title={"Sản phẩm chất lượng"}/>

        {/* Promo Banner */}
        <div className="bg-gray-100 p-4 rounded-lg my-8 text-center">
          <h3 className="text-xl font-bold">20% OFF</h3>
          <p>Rau quả bảo bảo cơ</p>
        </div>

        <ProductsIntro image={'/images/organic-product-banner-intro-2.png'} products={products} title={"Khuyến mãi"}/>
      </section>
    </div>
  );
};