'use client';

import { useEffect, useState } from 'react';
import { ProductType } from '@/app/page/products/type';
import { userInteractionService } from '@/services/userInteraction';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function RecommendedProducts() {
  const [recommendedProducts, setRecommendedProducts] = useState<ProductType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      if (user?.id) {
        try {
          const products = await userInteractionService.getRecommendedProducts(user.id);
          setRecommendedProducts(products);
        } catch (error) {
          console.error('Error loading recommended products:', error);
        }
      }
    };

    loadRecommendedProducts();
  }, [user?.id]);

  if (!user || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className='mt-8 relative'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Sản phẩm gợi ý cho bạn</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
          enabled: true,
          disabledClass: 'swiper-button-disabled'
        }}
        className='mySwiper px-10'
      >
        {recommendedProducts.map((item, index) => (
          <SwiperSlide 
            key={index}
            className='p-2'
          >
            <Link href={`/san-pham/${item?.slug}`}>
              <div className='group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'>
                <div className='relative aspect-square'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${item?.path}`}
                    unoptimized
                    quality={100}
                    alt={`Recommended Product ${index}`}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-3'>
                  <h3 className='font-semibold text-gray-800 mb-2 text-sm truncate'>{item?.name}</h3>
                  <div className='flex items-center justify-between'>
                    <p className='text-green-600 font-bold text-sm'>{item?.originalPrice?.toLocaleString('vi-VN')}₫</p>
                    <button className='text-lime-600 text-sm border-2 border-gray-300 rounded-lg px-3 py-1 hover:bg-lime-600 hover:text-white transition-colors duration-200'>Mua ngay</button>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
          className="w-5 h-5 text-lime-600 group-hover:text-lime-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
          className="w-5 h-5 text-lime-600 group-hover:text-lime-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
} 