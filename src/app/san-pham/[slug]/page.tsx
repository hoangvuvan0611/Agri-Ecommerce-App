'use client';
import { ProductType } from '@/app/page/products/type';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Hàm này chạy ở server-side
async function getProduct(slug: string) {
    // Gọi database hoặc API để lấy thông tin sản phẩm
    const res = await fetch(`${process.env.API_URL}/api/products/${slug}`, { next: { revalidate: 60 } });
    
    if (!res.ok) return null;
    
    return res.json();
}

export default function ProductPage() {

  const { slug } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        axiosInstance.get(`/api/v1/product/productBySlug=${slug}`)
        .then((response) => {
            setProduct(response?.data?.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
      <div className='container mx-auto px-4 py-8'>
        {/* Product Detail Section */}
        <div className='grid grid-cols-12 gap-12 mb-12'>
          {/* Left Column - Images : 5 cột */}
          <div className='col-span-5 space-y-6'>
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
          <div className='col-span-7 space-y-8 p-6 bg-white rounded-2xl shadow-md'>
            <div>
              <h1 className='text-4xl font-bold text-gray-800 mb-2'>{product?.name}</h1>
              <div className='flex items-center space-x-4 text-sm text-gray-500'>
                <span>Mã SP: {product?.id || 'N/A'}</span>
                <span>•</span>
                <span>Còn hàng</span>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-2xl font-semibold text-gray-800'>Mô tả sản phẩm</h2>
              <p className='text-gray-600 leading-relaxed'>
                {product?.uses}
              </p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <span className='text-3xl font-bold text-green-600'>{product?.originalPrice?.toLocaleString('vi-VN')}₫</span>
                {product?.oldPrice && (
                  <span className='text-xl text-gray-400 line-through'>{product?.oldPrice?.toLocaleString('vi-VN')}₫</span>
                )}
              </div>
              
              <button className='w-full bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl'>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-16'>
          <h2 className='text-2xl font-bold mb-8 text-gray-800'>Sản phẩm gợi ý</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className='group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'>
                <div className='relative aspect-square'>
                  <Image
                    src={'http://116.104.51.101:8080/agri-shop/organic-icon-4.webp'}
                    alt={`Related Product ${index}`}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold text-gray-800 mb-2'>Sản phẩm gợi ý {index}</h3>
                  <p className='text-green-600 font-bold'>300.000₫</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}