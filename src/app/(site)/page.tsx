import React from 'react';
import HeroSection from '@/components/layout/hero';
import BannerImage from '@/components/common/bannerImage';
import BannerElement from '@/components/common/bannerElement';
import Features from '../page/features';
import ProductsIntro from '../page/products';

export default function FruitStorePage () {
  return (
    <div className="mx-10">
      {/* Hero Section */}
      <HeroSection/>

      <section className='container'>
        {/* Features */}
        <Features/>

        <ProductsIntro
          image={'/images/organic-product-banner-intro-1.png'} 
          title={"Sản phẩm chất lượng"}
          titleBgBanner={"Trái cây tự nhiên mỗi này"}
          styleTitleBg={{color: 'white', fontSize: '1.7rem', fontWeight: 'lighter', width: '100px'}}
          hasButton={true}
          page={0}
          size={10}
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
          title={"Bán chạy"}
          titleBgBanner={"Thực phẩm sạch bán chạy"}
          styleTitleBg={{color: 'black', fontSize: '1.6rem', fontWeight: 'lighter', width: '150px'}}
          hasButton={true}
          page={1}
          size={10}
        />

        <BannerElement/>

        <ProductsIntro
            image={'/images/organic-product-banner-intro-3.png'}
            title={"Khuyến mãi"}
            titleBgBanner={""}
            styleTitleBg={{color: 'black', fontSize: '1.6rem', fontWeight: 'lighter', width: '150px'}}
            hasButton={false}
            page={2}
            size={10}
        />
      </section>
    </div>
  );
};