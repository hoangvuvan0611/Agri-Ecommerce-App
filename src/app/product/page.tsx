'use client';
import AxiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { useEffect } from "react";
import { ProductType } from "../page/products/type";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {

    const [ products, setProducts ] = useState<ProductType[]>([]);

    useEffect(() => {
        AxiosInstance.get('/api/v1/product/showInit', 
            {
                params: {
                    page: 0,
                    size: 50,
                }
            }
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
                    <Link href="/product" className='hover:text-green-400 transition-colors'>
                        Sản phẩm
                    </Link>
                    </div>
                </div>
                </div>
            </div>

            {/* Filter and Sort */}
            <div className="flex justify-between items-center mb-6">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                    <FilterIcon className="w-4 h-4" />
                    BỘ LỌC
                </button>

                <select className="px-4 py-2 border rounded-lg">
                    <option>Sắp xếp mặc định</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <div className="relative aspect-square">
                            <Image
                                src={`http://116.104.51.101:8080/agri-shop/${product?.path}`}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-gray-800 mb-2 text-sm truncate">{product.name}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-green-600 font-bold text-sm">
                                    {product?.originalPrice?.toLocaleString('vi-VN')}₫
                                </p>
                                <button className="text-lime-600 text-sm border-2 border-gray-300 rounded-lg px-3 py-1 hover:bg-lime-600 hover:text-white transition-colors duration-200">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}