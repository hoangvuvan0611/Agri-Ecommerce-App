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
        addToCart(product);
        toast.success('Đã thêm sản phẩm vào giỏ hàng');
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
        <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-600">{title}</h2>
            <div className="grid grid-cols-12 gap-4 h-[770px] py-[30px]">
                <div className="col-span-3 relative bg-cover bg-center rounded-xl p-10">
                    {/* Background image */}
                    <div className="absolute inset-0 -z-10"> 
                        <Image
                            src={image}
                            alt="Organic Farm"  
                            height={700}
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
                    {hasButton && <Button className="bg-white hover:bg-lime-600 hover:text-white text-black mt-4">Mua ngay</Button>}
                </div>
                <div className="col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {productList && productList?.map((product: ProductType) => (
                            <div key={product.id} 
                                className="hover:shadow-lg rounded-xl cursor-pointer h-[340px]"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="p-4 h-full flex flex-col">
                                    <Link href={`/san-pham/${product?.slug}`} className="group relative overflow-hidden rounded-md h-48">
                                        {/* Ảnh và hiệu ứng zoom */}
                                        <div className="relative w-full h-48">
                                            <Image
                                                src={`http://116.104.51.101:8080/agri-shop/${product.path}`}
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
                                        
                                        {/* Thay thế Link bằng button hoặc div */}
                                        <div 
                                            title="Xem chi tiết"
                                            className="absolute bottom-2 right-2 bg-white p-3 duration-150 rounded-md hover:bg-lime-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </Link>

                                    {/* Thông tin sản phẩm */}
                                    <div className="flex flex-col flex-1 justify-between">
                                        <h3 className="mt-2 font-medium text-sm line-clamp-2 h-10 overflow-hidden"
                                            title={product.name}
                                        >
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-0">
                                            <span className="text-sm font-semibold">
                                                {product?.originalPrice?.toLocaleString()}đ
                                            </span>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}