import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BannerElement() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
        {[1, 2, 3].map((item, index) => (
            <div
            key={index}
            className="h-[240px] md:h-[258px] bg-orange-300 p-6 sm:p-6 md:p-8 rounded-xl text-white group overflow-hidden relative"
            >
            {/* Layer background có hiệu ứng zoom */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110">
                <Image
                src={`/images/organic-banner-element-${item}.webp`}
                alt="Organic Farm"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                quality={95}
                />
            </div>

            {/* Nội dung bên trong */}
            <div className="relative z-10">
                <h2 className="text-xl md:text-3xl font-bold">
                <span className="text-green-600">30% </span>
                SALE OFF
                </h2>
                <p className="text-sm md:text-base">Spring Fresh Deal</p>
                <Button
                variant="outline"
                className="mt-4 text-black border-white hover:bg-white hover:text-orange-300 font-medium"
                >
                Mua Ngay
                </Button>
            </div>
            </div>
        ))}
        </div>
    );
}