// app/products/[slug]/page.js
import { notFound } from 'next/navigation';

// Hàm này chạy ở server-side
async function getProduct(slug: string) {
    // Gọi database hoặc API để lấy thông tin sản phẩm
    const res = await fetch(`${process.env.API_URL}/api/products/${slug}`, { next: { revalidate: 60 } });
    
    if (!res.ok) return null;
    
    return res.json();
}

export default function ProductPage() {
    // const { slug } = params;
    // const product = await getProduct("hoang");
    
    // if (!product) {
    //   notFound();
    // }
    
    return (
      <div>
        Hoàng
        {/* <h1>{product.name}</h1>
        <p>{product.description}</p> */}
        {/* Hiển thị các thông tin khác của sản phẩm */}
      </div>
    );
}