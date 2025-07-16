'use client';

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const imageList = [
    '/images/organic-banner-left-1.webp',
    '/images/organic-banner-left-2.webp'
];

export default function HeroSection () {

    const [currentImage, setCurrentImage] = useState(0);

    // Tự động chuyển ảnh sau 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev: number) => (prev + 1) % imageList.length);
        }, 5000); // 5 giây đổi ảnh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="md:p-10 p-2 gap-1 md:my-8 bg-cover bg-center rounded-xl relative">
            {/* Background image */}
            <div className="absolute inset-0 -z-10"> 
                <Image
                    src={'/images/organic-slider-bg.webp'}
                    alt="Organic Farm"  
                    fill
                    objectFit="cover"   // Chỉnh ảnh vừa khít với khung
                    objectPosition="center" // Vị trí ảnh trong khung
                    priority // Ưu tiên tải ảnh
                    quality={80} // Chất lượng ảnh
                />
            </div>

            <div className="container grid grid-cols-1 md:grid-cols-12 min-h-[200px] md:min-h-[450px]">
                {/* Left */}
                <div className="col-span-12 md:col-span-8 relative h-64 md:h-auto md:rounded-s-xl rounded-xl">
                    <AnimatePresence initial={true}>
                        <motion.img
                            key={currentImage}
                            className="absolute inset-0 bg-cover bg-center w-full h-full object-cover md:rounded-s-xl rounded-xl"
                            src={imageList[currentImage]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </AnimatePresence>
                    <div className="absolute right-[30%] top-[50%] transform translate-x-1/2 -translate-y-1/2 text-left">
                        <h1 className="xl:text-3xl font-bold mb-4">
                            Trang trại 
                            <span className="text-lime-600 font-thin"> Thực phẩm  <br /> tươi sạch & </span>
                            100% Hữu cơ
                        </h1>
                        <Button className="bg-lime-600 hover:bg-lime-700">Mua Ngay</Button>
                    </div>
                </div>

                {/* Right */}
                <div className="col-span-12 md:col-span-4 h-64 md:h-auto bg-orange-300 p-6 md:p-8 rounded-xl md:rounded-e-xl text-white group overflow-hidden relative mt-4 md:mt-0 hidden md:block">
                    {/* Layer background có hiệu ứng zoom */}
                    <div 
                        // absolute inset-0 : Đặt background phủ toàn bộ thẻ div cha
                        // transition-transform duration-300 ease-in-out group-hover:scale-110
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    >
                        <Image
                            src={'/images/organic-banner-right.webp'}
                            alt="Organic Farm"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            priority
                            quality={95}
                        />
                    </div>

                    {/* Nội dung bên trong */}
                    <div className="relative z-10">
                        <h2 className="xl:text-3xl font-bold">
                            <span className="text-green-600">30% </span>
                            SALE OFF</h2>
                        <p>Spring Fresh Deal</p>
                        <Button 
                            variant="outline" 
                            className="mt-4 text-black border-white hover:bg-white hover:text-orange-300 font-medium"
                        >
                            Mua Ngay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ); 
}