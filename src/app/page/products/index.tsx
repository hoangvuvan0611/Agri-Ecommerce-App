import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { ProductType } from "./type";
import Image from "next/image";
import React from "react";

interface ProductsProps {
    image: string;
    products: ProductType[];
    title: string;
    titleBgBanner?: string;
    styleTitleBg?: React.CSSProperties; 
}

export default function ProductsIntro ({image, products, title, titleBgBanner, styleTitleBg }: ProductsProps) {


    return (
        <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-600">{title}</h2>
            <div className="grid grid-cols-12 gap-4 h-[750px] py-[30px]">
                <div className="col-span-3 relative bg-cover bg-center rounded-xl p-10">
                    {/* Background image */}
                    <div className="absolute inset-0 -z-10"> 
                        <Image
                            src={image}
                            alt="Organic Farm"  
                            height={720}
                            width={360}
                            objectFit="cover"   // Chỉnh ảnh vừa khít với khung
                            objectPosition="center" // Vị trí ảnh trong khung
                            priority={false} // Ưu tiên tải ảnh
                            quality={100} // Chất lượng ảnh
                            className="rounded-md"
                        />
                    </div>
                    <div className="" style={styleTitleBg}>
                        {titleBgBanner}
                    </div>
                    <Button className="bg-white hover:bg-lime-600 hover:text-white text-black mt-4">Mua ngay</Button>
                </div>
                <div className="col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {products.map((product: ProductType) => (
                            <div key={product.id} className="hover:shadow-lg rounded-xl">
                                <div className="p-4">
                                    <div className="group relative overflow-hidden rounded-md">
                                        {/* Ảnh và hiệu ứng zoom */}
                                        <div className="relative w-full h-48">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                objectPosition="center"
                                                quality={100}
                                                className="transition-transform duration-1000 ease-in-out group-hover:scale-125"
                                            />
                                        </div>

                                        {/* Nút yêu thích */}
                                        <Button
                                            title="Yêu thích"
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </Button>
                                        <div 
                                            title="Xem chi tiết"
                                            className="absolute bottom-2 right-2 bg-white p-3 duration-150 rounded-md hover:bg-lime-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Thông tin sản phẩm */}
                                    <h3 className="mt-2 font-medium">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="">{product.price.toLocaleString()}đ</span>
                                        <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Thêm
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}