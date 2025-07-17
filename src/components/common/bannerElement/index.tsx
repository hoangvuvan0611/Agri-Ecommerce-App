import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BannerElement() {
    return (
        <div className="grid grid-cols-12 gap-4 my-8 hide md:block">
            <div className="col-span-4 h-[258] bg-orange-300 p-8 rounded-e-xl text-white group overflow-hidden relative">
                {/* Layer background có hiệu ứng zoom */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                >
                    <Image
                        src={'/images/organic-banner-element-1.webp'}
                        alt="Organic Farm"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                        quality={100}
                    />
                </div>

                {/* Nội dung bên trong */}
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold">
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

            <div className="col-span-4 h-[258] bg-orange-300 p-8 rounded-e-xl text-white group overflow-hidden relative">
                {/* Layer background có hiệu ứng zoom */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                >
                    <Image
                        src={'/images/organic-banner-element-2.webp'}
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
                    <h2 className="text-3xl font-bold">
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


            <div className="col-span-4 h-[258] bg-orange-300 p-8 rounded-e-xl text-white group overflow-hidden relative">
                {/* Layer background có hiệu ứng zoom */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                >
                    <Image
                        src={'/images/organic-banner-element-3.webp'}
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
                    <h2 className="text-3xl font-bold">
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
    );
}