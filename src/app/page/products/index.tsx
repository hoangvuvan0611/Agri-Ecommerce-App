'use client';
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { ProductType } from "./type";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import AxiosInstance from "@/utils/axiosInstance";
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { activityLogService } from "@/services/activityLogService";
import { MESSAGE_ADD_TO_CART_SUCCESS } from "@/lib/constants";

interface ProductsProps {
    image: string;
    title: string;
    titleBgBanner?: string;
    styleTitleBg?: React.CSSProperties;
    hasButton: boolean;
    page: number;
    size: number;
}

export default function ProductsIntro ({
   image,
   title,
   titleBgBanner,
   styleTitleBg,
   hasButton,
   page,
   size,
}: ProductsProps) {

    const [productList, setProductList] = React.useState<ProductType[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        AxiosInstance.get('/api/v1/product/showInit', 
            {
                params: {
                    page,
                    size,
                }
            }
        ).then((response) => {
            // Kiểm tra dữ liệu trả về có phải là mảng không
            if (Array.isArray(response.data.data)) {
                setProductList(response.data.data);
            } else {
                console.error("Dữ liệu trả về không phải là mảng:", response.data);
                setProductList([]);
            }
        }).catch((error) => {
            console.error("Error fetching products:", error);
            setProductList([]); // Đặt về mảng rỗng khi có lỗi
        });  
    }, []);

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

    const handleProductClick = async (productId: string) => {
        // Lưu log khi người dùng click vào sản phẩm
        await activityLogService.logView(productId);
    };

    const handleAddProductToCartClick = async (productId: string) => {
        // Lưu log khi người dùng click vào sản phẩm
        await activityLogService.logCartAction( 'add_to_cart',productId);
    };

    return (
        <div className="mt-10 md:mt-20">
            <h2 className="text-lg md:text-2xl font-bold text-gray-600 px-2 md:px-0">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[400px] md:min-h-[770px] py-4 md:py-[30px]">
                <div className="col-span-1 md:col-span-3 relative bg-cover bg-center rounded-xl p-4 md:p-10 mb-4 md:mb-0 flex flex-col items-center justify-center">
                    {/* Background image */}
                    <div className="absolute inset-0 -z-10 rounded-md overflow-hidden"> 
                        <Image
                            src={image}
                            alt="Organic Farm"  
                            height={400}
                            width={360}
                            style={{objectFit: 'cover', objectPosition: 'center'}}
                            priority={false}
                            quality={100}
                            className="rounded-md w-full h-full"
                        />
                    </div>
                    <div className="text-base md:text-lg font-semibold text-center" style={styleTitleBg}>
                        {titleBgBanner}
                    </div>
                    {hasButton && <Button className="bg-white hover:bg-lime-600 hover:text-white text-black mt-4 w-full md:w-auto">Mua ngay</Button>}
                </div>
                <div className="col-span-1 md:col-span-9">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                        {productList && productList?.map((product: ProductType) => (
                            <div key={product.id} 
                                className="hover:shadow-lg rounded-xl cursor-pointer h-[180px] sm:h-[220px] md:h-[340px] flex flex-col bg-white"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="p-2 md:p-4 h-full flex flex-col">
                                    <Link href={`/san-pham/${product?.slug}`} className="group relative overflow-hidden rounded-md h-24 sm:h-32 md:h-48">
                                        {/* Ảnh và hiệu ứng zoom */}
                                        <div className="relative w-full h-24 sm:h-32 md:h-48">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
                                                alt={product.name}
                                                fill
                                                style={{objectFit: 'cover', objectPosition: 'center'}}
                                                quality={100}
                                                className="transition-transform duration-1000 ease-in-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Nút yêu thích */}
                                        <Button
                                            title="Yêu thích"
                                            size="icon"
                                            variant="ghost"
                                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </Button>
                                        
                                        {/* Thay thế Link bằng button hoặc div */}
                                        <div 
                                            title="Xem chi tiết"
                                            className="absolute bottom-1 right-1 bg-white p-2 duration-150 rounded-md hover:bg-lime-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </Link>

                                    {/* Thông tin sản phẩm */}
                                    <div className="flex flex-col flex-1 justify-between mt-1 md:mt-2">
                                        <h3 className="font-medium text-xs sm:text-sm line-clamp-2 h-8 sm:h-10 overflow-hidden"
                                            title={product.name}
                                        >
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-0">
                                            <span className="text-xs sm:text-sm font-semibold">
                                                {product?.originalPrice?.toLocaleString()}đ
                                            </span>
                                            <Button 
                                                size="sm" 
                                                className="bg-lime-600 hover:bg-lime-700 px-2 md:px-4 text-xs sm:text-sm"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddToCart(product);
                                                    handleAddProductToCartClick(product.id);
                                                }}
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-1" />
                                                Thêm
                                            </Button>
                                        </div>
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