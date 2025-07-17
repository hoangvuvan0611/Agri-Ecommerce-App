'use client';
import AxiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { FilterIcon, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { ProductType } from "../../page/products/type";
import Image from "next/image";
import Link from "next/link";
import { activityLogService } from "@/services/activityLogService";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { MESSAGE_ADD_TO_CART_SUCCESS } from "@/lib/constants";

export default function ProductPage() {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        AxiosInstance.get('/api/v1/product/showInit', {params: { page: 1, size: 40 } }
        ).then((recommendResponse) => {
            console.log('Recommend Response:', recommendResponse?.data);
            setProducts(recommendResponse?.data?.data);
        })
    }, []);

    const handleProductClick = async (productId: string) => {
        // Lưu log khi người dùng click vào sản phẩm
        await activityLogService.logView(productId);
    };

    const { addToCart } = useCart();
    const handleAddToCart = (product: ProductType) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.originalPrice,
            quantity: 1,    
            path: product.path,
            salePrice: product.salePrice,   
            originalPrice: product.originalPrice
        });
        toast.success(MESSAGE_ADD_TO_CART_SUCCESS);
    };

    const handleAddProductToCartClick = async (productId: string) => {
        // Lưu log khi người dùng click vào sản phẩm
        await activityLogService.logCartAction( 'add_to_cart',productId);
    };

    return (
        <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20">
        <div className="container xl:mx-auto py-4">
            {/* Banner Section */}
            <div className='relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[100px] mb-4 rounded-2xl overflow-hidden'>
            <Image
                src={`/images/organic-breadcrumb.png`}
                alt={"Organic Farm"}
                fill
                className='object-cover object-center rounded-2xl'
                priority
                quality={100}
            />
            <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                <div className='text-white space-y-2 text-center px-2 text-sm sm:text-base'>
                <div className='flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm'>
                    <Link href="/" className='hover:text-green-400 transition-colors'>
                    Trang chủ
                    </Link>
                    <span>›</span>
                    <Link href="/san_pham" className='text-lime-400 transition-colors'>
                    Sản phẩm
                    </Link>
                </div>
                </div>
            </div>
            </div>

            {/* Filter and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-2">
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                <FilterIcon className="w-4 h-4" />
                BỘ LỌC
                </button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <select className="px-4 py-2 border rounded-lg bg-white text-sm hover:border-gray-400 w-full sm:w-auto">
                <option>Sắp xếp mặc định</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
                </select>
                <div className="flex gap-2">
                <button className="p-2 border rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                </button>
                <button className="p-2 border rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </button>
                </div>
            </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 px-2">
            {products.map((product) => (
                <div key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                onClick={() => handleProductClick(product.id)}
                >
                <Link href={`/san-pham/${product.slug}`} className="group relative overflow-hidden rounded-lg block">
                    <div className="group relative aspect-square overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                        className="transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    />
                    {product.salePrice && (
                        <span className="absolute top-2 left-2 bg-lime-500 text-white px-2 py-1 text-xs rounded">
                        -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                        </span>
                    )}
                    </div>
                    <div className="p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-lime-600 font-semibold text-sm sm:text-base">
                        {product?.originalPrice?.toLocaleString('vi-VN')}₫
                        </div>
                        <Button
                        size="sm"
                        className="bg-lime-600 hover:bg-lime-700"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                            handleAddProductToCartClick(product.id);
                        }}
                        >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm
                        </Button>
                    </div>
                    </div>
                </Link>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}