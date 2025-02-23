import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductType } from "./type";
import Image from "next/image";

interface ProductsProps {
    image: string;
    products: ProductType[];
    title: string;
}

export default function ProductsIntro ({image, products, title }: ProductsProps) {


    return (
        <div className="my-20">
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
                    <div className="text-white text-2xl">
                        Nông sản <br/> tự nhiên <br/> mỗi ngày
                    </div>
                    <Button className="bg-white hover:bg-lime-600 hover:text-white text-black mt-4">Mua ngay</Button>
                </div>
                <div className="col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {products.map((product: ProductType) => (
                            <Card key={product.id} className="group">
                                <CardContent className="p-4">
                                    <div className="relative z-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                    </div>
                                    <h3 className="mt-2 font-medium">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold">{product.price.toLocaleString()}đ</span>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Thêm
                                    </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}