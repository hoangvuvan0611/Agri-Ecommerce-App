'use client';
import { ProductType } from '@/app/page/products/type';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function ProductPage() {

  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [ productSuggest, setProductSuggest ] = useState<ProductType[]>([]);

  // Lay thong tin san pham
  useEffect(() => {
    axiosInstance.get(`/api/v1/product/productBySlug=${slug}`)
    .then((response) => {
      const productData = response?.data?.data;
      setProduct(productData);
      
      if (productData?.id) {
        console.log('Calling recommend API with ID:', productData.id);
        axiosInstance.get(`/api/v1/product/recommend_products/${productData.id}`)
        .then((recommendResponse) => {
          console.log('Recommend Response:', recommendResponse?.data);
          setProductSuggest(recommendResponse?.data?.data);
        })
        .catch((error) => {
          console.error('Error fetching recommendations:', error);
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
    });
  }, [slug]); // Chỉ phụ thuộc vào slug

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    }
  };

  return (
    <div className='container mx-auto px-4 py-2'>
      {/* Banner Section */}
      <div className='relative w-full h-[100px] mb-2 rounded-2xl overflow-hidden'>
        <Image
          src={`/images/organic-breadcrumb.png`}
          alt={"Organic Farm"}
          fill
          className='object-cover object-center rounded-2xl'
          priority
          quality={100}
        />
        {/* Overlay với breadcrumb */}
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
          <div className='text-white space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>{product?.name}</h1>
            <div className='flex items-center gap-2 text-sm'>
              <Link href="/" className='hover:text-green-400 transition-colors'>
                Trang chủ
              </Link>
              <span>›</span>
              <Link href="/san-pham" className='hover:text-green-400 transition-colors'>
                Sản phẩm
              </Link>
              <span>›</span>
              <span className='text-lime-400'>{product?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Product Detail Section */}
        <div className='grid grid-cols-12 gap-12 mb-12'>
          {/* Left Column - Images : 5 cột */}
          <div className='col-span-4 space-y-6'>
            {/* Main Image */}
            <div className='relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg'>
              <Image
                src={`http://116.104.51.101:8080/agri-shop/${product?.path}`}
                alt={product?.name || "Organic Farm"}
                fill
                className='object-cover hover:scale-105 transition-transform duration-300'
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Right Column - Product Info : 7 cột */}
          <div className='col-span-8 space-y-8 p-6 bg-white rounded-2xl shadow-md'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product?.name}</h1>
              <div className='flex items-center space-x-4 text-sm text-gray-500'>
                <span>Mã SP: {product?.id || 'N/A'}</span>
                <span>•</span>
                <span>Còn hàng</span>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-800'>Mô tả sản phẩm</h2>
              <p className='text-gray-600 leading-relaxed'>
                {product?.uses}
              </p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <span className='text-3xl font-bold text-green-600'>{product?.salePrice?.toLocaleString('vi-VN')}₫</span>
                {product?.originalPrice && (
                  <span className='text-xl text-gray-400 line-through'>{product?.originalPrice?.toLocaleString('vi-VN')}₫</span>
                )}
              </div>
              
              <div className='flex items-center space-x-4'>
                <button className='w-full bg-lime-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl'>
                  Mua ngay
                </button>
                <button 
                  onClick={handleAddToCart}
                  className='w-full text-lime-600 px-8 py-4 rounded-xl border-2 hover:border-lime-600 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl'
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-8 relative'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>Sản phẩm tương tự</h2>
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
            {productSuggest?.map((item, index) => (
              <SwiperSlide 
                key={index}
                className='p-2'
              >
                <Link href={`/san-pham/${item?.slug}`}>
                  <div className='group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'>
                    <div className='relative aspect-square'>
                      <Image
                        src={`http://116.104.51.101:8080/agri-shop/${item?.path}`}
                        alt={`Related Product ${index}`}
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
      </div>
    </div>
  );
}