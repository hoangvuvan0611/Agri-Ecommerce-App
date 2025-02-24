import React from 'react';
import HeroSection from '@/components/layout/hero';
import Features from './page/features';
import ProductsIntro from './page/products';
import BannerImage from '@/components/common/bannerImage';

const products = [
  { id: 1, name: 'Nho xanh', price: 250000, image: '/images/product-test.png' },
  { id: 2, name: 'Đào', price: 180000, image: '/images/product-test.png' },
  { id: 3, name: 'Chanh dây', price: 120000, image: '/images/product-test.png' },
  { id: 4, name: 'Chuối', price: 80000, image: '/images/product-test.png' },
  { id: 5, name: 'Dưa leo', price: 45000, image: '/images/product-test.png' },
  { id: 6, name: 'Ớt', price: 35000, image: '/images/product-test.png' },
  { id: 7, name: 'Dừa', price: 40000, image: '/images/product-test.png' },
  { id: 8, name: 'Bông cải', price: 65000, image: '/images/product-test.png' },
  { id: 9, name: 'Cà chua', price: 55000, image: '/images/product-test.png' },
  { id: 10, name: 'Lựu', price: 150000, image: '/images/product-test.png' },
];

export default function FruitStorePage () {
  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection/>

      <section className='container'>
        {/* Features */}
        <Features/>

        <ProductsIntro 
          image={'/images/organic-product-banner-intro-1.png'} 
          products={products} 
          title={"Sản phẩm chất lượng"}
          titleBgBanner={"Trái cây tự nhiên mỗi này"}
          styleTitleBg={{color: 'white', fontSize: '1.7rem', fontWeight: 'lighter', width: '100px'}}
        />

        {/* Promo Banner */}
        <BannerImage 
          title={'25% OFF'}
          titleStyle={{color: 'red', fontSize: '1.5rem', fontWeight: 'lighter'}}
          content={'Rau quả bảo bảo cơ'}
          contentStyle={{fontSize: '1rem', fontWeight: 'normal'}}
          image={'/images/organic-banner-image-1.webp'}

        />

        <ProductsIntro 
          image={'/images/organic-product-banner-intro-2.png'} 
          products={products} 
          title={"Khuyến mãi"}
          titleBgBanner={"Thực phẩm sạch bán chạy"}
          styleTitleBg={{color: 'black', fontSize: '1.6rem', fontWeight: 'lighter', width: '150px'}}
        />
      </section>
    </div>
  );
};