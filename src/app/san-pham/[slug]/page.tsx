'use client';
import Image from 'next/image';

// Hàm này chạy ở server-side
async function getProduct(slug: string) {
    // Gọi database hoặc API để lấy thông tin sản phẩm
    const res = await fetch(`${process.env.API_URL}/api/products/${slug}`, { next: { revalidate: 60 } });
    
    if (!res.ok) return null;
    
    return res.json();
}

export default function ProductPage() {
    return (
      <div className='container mx-auto px-4 py-8'>
        {/* Product Detail Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {/* Left Column - Images : Ảnh sản phẩm*/}
          <div className='space-y-4'>
            {/* Main Image : Ảnh sản phẩm chính*/}
            <div className='relative aspect-square w-full'>
              <Image
                src={'http://116.104.51.101:8080/agri-shop/organic-icon-4.webp'}
                alt="Organic Farm"
                fill
                className='object-cover rounded-lg'
                priority
                quality={95}
              />
            </div>
            {/* Thumbnail Images : Các ảnh khác của sản phẩm*/}
            <div className='grid grid-cols-4 gap-2'>
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className='relative aspect-square cursor-pointer'>
                  <Image
                    src={'http://116.104.51.101:8080/agri-shop/organic-icon-4.webp'}
                    alt={`Thumbnail ${index}`}
                    fill
                    className='object-cover rounded-lg hover:opacity-75'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>Tên Sản Phẩm</h1>
            <div className='text-2xl font-semibold text-green-600'>
              500.000₫
            </div>
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Mô tả sản phẩm</h2>
              <p className='text-gray-600'>
                Đây là phần mô tả chi tiết về sản phẩm...
              </p>
            </div>
            <button className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700'>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-16'>
          <h2 className='text-2xl font-bold mb-6'>Sản phẩm gợi ý</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className='group cursor-pointer'>
                <div className='relative aspect-square mb-2'>
                  <Image
                    src={'http://116.104.51.101:8080/agri-shop/organic-icon-4.webp'}
                    alt={`Related Product ${index}`}
                    fill
                    className='object-cover rounded-lg group-hover:opacity-75'
                  />
                </div>
                <h3 className='font-semibold'>Sản phẩm gợi ý {index}</h3>
                <p className='text-green-600'>300.000₫</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}