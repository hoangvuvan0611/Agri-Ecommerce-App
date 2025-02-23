import { Button } from "@/components/ui/button";

export default function HeroSection () {
    return (
        <div className="grid grid-cols-12 gap-4 my-8 bg-cover bg-center p-4 h-[500] w-full rounded-lg"
            style={{ backgroundImage: 'url(/images/organic-slider-bg.webp)' }}
        >
            {/* Left */}
            <div className="col-span-8 bg-white p-8 rounded-lg grid-cols-8" 
                
            >
                <h1 className="text-3xl font-bold mb-4">Trang trại Thực phẩm<br />tươi sạch & 100% Hữu cơ</h1>
                <Button className="bg-lime-600 hover:bg-lime-700">Mua Ngay</Button>
            </div>

            {/* Right */}
            <div 
                className="col-span-4 bg-orange-300 p-8 rounded-e-xl text-white group overflow-hidden relative"
            >
                {/* Layer background có hiệu ứng zoom */}
                <div 
                    // absolute inset-0 : Đặt background phủ toàn bộ thẻ div cha
                    // transition-transform duration-300 ease-in-out group-hover:scale-110
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ backgroundImage: 'url(/images/organic-banner-right.webp)' }}
                ></div>

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