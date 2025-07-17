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
import { userInteractionService } from '@/services/userInteraction';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem } from '@/contexts/CartContext';
import { activityLogService } from '@/services/activityLogService';
import { MESSAGE_ADD_TO_CART_SUCCESS } from '@/lib/constants';

export default function ProductPage() {

  const { slug } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [ productSuggest, setProductSuggest ] = useState<ProductType[]>([]);
  const [ productSuggestLike, setProductSuggestLike ] = useState<ProductType[]>([]);

  // Lay thong tin san pham
  useEffect(() => {
    axiosInstance.get(`/api/v1/product/productBySlug=${slug}`)
    .then((response) => {
      const productData = response?.data?.data;
      setProduct(productData);
      
      // Ghi lại hành vi xem sản phẩm
      if (user?.id && productData?.id) {
        userInteractionService.recordView(user.id, productData.id);
      } else {
        // Lưu tương tác vào localStorage nếu chưa đăng nhập
        const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        interactions.push({
          type: 'view',
          productId: productData.id,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('userInteractions', JSON.stringify(interactions));
      }
      
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

      axiosInstance.get(`/api/v1/product/bestSellerInMonth=20`)
      .then((recommendResponse) => {
        console.log('Recommend Response:', recommendResponse?.data);
        setProductSuggestLike(recommendResponse?.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
    });
  }, [slug, user?.id]); // Chỉ phụ thuộc vào slug và user.id

  const handleAddToCart = () => {
    if (product) {
      // Chuyển đổi ProductType sang CartItem
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.originalPrice,
        quantity: 1,
        path: product.path,
        originalPrice: product.originalPrice,
        salePrice: product.salePrice
      };
      
      addToCart(cartItem);
      
      // Ghi lại hành vi thêm vào giỏ hàng
      if (user?.id) {
        userInteractionService.recordCart(user.id, product.id);
      } else {
        // Lưu tương tác vào localStorage nếu chưa đăng nhập
        const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        interactions.push({
          type: 'cart',
          productId: product.id,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('userInteractions', JSON.stringify(interactions));
      }
      
      toast.success(MESSAGE_ADD_TO_CART_SUCCESS);
    }
  };

  const handleProductClick = async (productId: string) => {
    // Lưu log khi người dùng click vào sản phẩm
    await activityLogService.logView(productId);
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
            <h1 className='text-lg md:text-2xl font-bold'>{product?.name}</h1>
            <div className='flex flex-wrap justify-center items-center gap-1 md:gap-2 text-xs md:text-sm'>
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
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-12'>
          {/* Left Column - Images */}
          <div className='md:col-span-4 space-y-6'>
            <div className='relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg'>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
                alt={product?.name || "Organic Farm"}
                fill
                unoptimized
                className='object-cover hover:scale-105 transition-transform duration-300'
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className='md:col-span-8 space-y-6 p-4 md:p-6 bg-white rounded-2xl shadow-md'>
            <div>
              <h1 className='text-xl md:text-3xl font-bold text-gray-800 mb-2'>{product?.name}</h1>
              <div className='flex flex-wrap items-center space-x-2 text-sm text-gray-500'>
                <span>Mã SP: {product?.id || 'N/A'}</span>
                <span>•</span>
                <span>Còn hàng</span>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-lg md:text-xl font-semibold text-gray-800'>Mô tả sản phẩm</h2>
              <p className='text-gray-600 leading-relaxed'>{product?.uses}</p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <span className='text-2xl md:text-3xl font-bold text-green-600'>
                  {product?.salePrice?.toLocaleString('vi-VN')}₫
                </span>
                {product?.originalPrice && (
                  <span className='text-lg md:text-xl text-gray-400 line-through'>
                    {product?.originalPrice?.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>

              <div className='flex flex-col md:flex-row gap-3 md:space-x-4'>
                <button className='w-full bg-lime-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl'>
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToCart}
                  className='w-full text-lime-600 px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 hover:border-lime-600 transition-colors duration-200 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl'
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-8 relative'>
          <h2 className='text-xl md:text-2xl font-bold mb-4 text-gray-800'>Sản phẩm tương tự</h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
              enabled: true,
              disabledClass: 'swiper-button-disabled',
            }}
            className='mySwiper px-2 md:px-10'
          >
            {productSuggest?.map((item, index) => (
              <SwiperSlide key={index} className='p-2'>
                <Link href={`/san-pham/${item?.slug}`}>
                  <div
                    className='group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'
                    onClick={() => handleProductClick(item.id)}
                  >
                    <div className='relative aspect-square'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${item?.path}`}
                        alt={`Related Product ${index}`}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                    <div className='p-3'>
                      <h3 className='font-semibold text-gray-800 mb-2 text-sm truncate'>{item?.name}</h3>
                      <div className='flex items-center justify-between'>
                        <p className='text-green-600 font-bold text-sm'>{item?.originalPrice?.toLocaleString('vi-VN')}₫</p>
                        <button className='text-lime-600 text-sm border-2 border-gray-300 rounded-lg px-3 py-1 hover:bg-lime-600 hover:text-white transition-colors duration-200'>
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom hidden md:flex absolute top-1/2 left-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-5 h-5 text-lime-600 group-hover:text-lime-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="swiper-button-next-custom hidden md:flex absolute top-1/2 right-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-5 h-5 text-lime-600 group-hover:text-lime-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>

        {/* Related Products Section 2 */}
        <div className='mt-8 relative'>
          <h2 className='text-xl md:text-2xl font-bold mb-4 text-gray-800'>Sản phẩm dành cho bạn</h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom-1',
              nextEl: '.swiper-button-next-custom-1',
              enabled: true,
              disabledClass: 'swiper-button-disabled-1',
            }}
            className='mySwiper px-2 md:px-10'
          >
            {productSuggestLike?.map((item, index) => (
              <SwiperSlide key={index} className='p-2'>
                <Link href={`/san-pham/${item?.slug}`}>
                  <div
                    className='group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'
                    onClick={() => handleProductClick(item.id)}
                  >
                    <div className='relative aspect-square'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${item?.path}`}
                        alt={`Related Product ${index}`}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                    <div className='p-3'>
                      <h3 className='font-semibold text-gray-800 mb-2 text-sm truncate'>{item?.name}</h3>
                      <div className='flex items-center justify-between'>
                        <p className='text-green-600 font-bold text-sm'>{item?.originalPrice?.toLocaleString('vi-VN')}₫</p>
                        <button className='text-lime-600 text-sm border-2 border-gray-300 rounded-lg px-3 py-1 hover:bg-lime-600 hover:text-white transition-colors duration-200'>
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom-1 hidden md:flex absolute top-1/2 left-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-5 h-5 text-lime-600 group-hover:text-lime-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="swiper-button-next-custom-1 hidden md:flex absolute top-1/2 right-0 z-10 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center hover:bg-lime-50 transition-colors group cursor-pointer">
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