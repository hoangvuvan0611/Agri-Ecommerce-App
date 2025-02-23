import Image from "next/image";
import { FeaturesType } from "./type";

const features: FeaturesType[] = [
    {
        id: 1,
        title: 'Tươi sạch',
        description: 'Sản phẩm được thu hoạch tươi sạch mỗi ngày, giữ nguyên độ tươi mới và giàu dinh dưỡng.',
        imagePath: '/images/organic-icon-1.webp',  
    },
    {
        id: 2,
        title: 'Hữu cơ',
        description: 'Trồng theo phương pháp hữu cơ an toàn, an toàn cho sức khỏe người tiêu dùng.',
        imagePath: '/images/organic-icon-2.webp',  
    },
    {
        id: 3,
        title: 'Chất lượng',
        description: 'Sản phẩm đạt chuẩn chất lượng cao và đảm bảo an toàn thực phẩm.',
        imagePath: '/images/organic-icon-3.webp',  
    },
    {
        id: 4,
        title: 'Tự nhiên',
        description: 'Giữ nguyên hương vị tự nhiên đặc trưng, mang lại trải nghiệm thuần khiết từ thiên nhiên.',
        imagePath: '/images/organic-icon-4.webp',  
    }
];

export default function Features() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-8">
            {features?.map((feature) => (
                <div key={feature.id} className="flex items-center gap-6">
                    {/* Container cho phần ảnh */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Box shadow container */}
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative"
                             style={{ boxShadow: "0 0 15px 0px #DDDDDD" }}>
                            {/* Vòng tròn xanh quay */}
                            <div className="absolute inset-0 border-2 border-dashed border-green-500 rounded-full 
                                        group hover:animate-[spin_8s_linear_infinite] hover:border-2 transition-all duration-700"
                            >
                            </div>
                            {/* Ảnh */}
                            <Image                          
                                src={feature.imagePath}                         
                                alt={feature.title}                          
                                objectFit="cover"                         
                                width={68}                          
                                height={68}                      
                            />
                        </div>
                    </div>
                    
                    {/* Text content */}
                    <div>
                        <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                        <p className="font-normal text-xs text-gray-400">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}