'use client';
import AxiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { useEffect } from "react";
import { ProductType } from "../../page/products/type";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        AxiosInstance.get('/api/v1/product/showInit'
        ).then((recommendResponse) => {
            console.log('Recommend Response:', recommendResponse?.data);
            setProducts(recommendResponse?.data?.data);
        })
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Banner Section */}
            <div className='relative w-full h-[100px] mb-4 rounded-2xl overflow-hidden'>
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
                    <div className='flex items-center gap-2 text-sm'>
                    <Link href="/" className='hover:text-green-400 transition-colors'>
                        Trang chủ
                    </Link>
                    <span>›</span>
                    <Link href="/product" className='text-lime-400 transition-colors'>
                        Sản phẩm
                    </Link>
                    </div>
                </div>
                </div>
            </div>

            {/* Filter and View Options */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                        <FilterIcon className="w-4 h-4" />
                        BỘ LỌC
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <select className="px-4 py-2 border rounded-lg bg-white hover:border-gray-400">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                        <div className="relative aspect-square">
                            <Image
                                src={`http://116.104.51.101:8080/agri-shop/${product?.path}`}
                                alt={product.name}
                                fill
                                className="object-cover rounded-t-lg"
                            />
                            {product.salePrice && (
                                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                                    -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <div className="text-green-600 font-semibold">
                                    {product?.originalPrice?.toLocaleString('vi-VN')}₫
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}