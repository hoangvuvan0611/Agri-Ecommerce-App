import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
<div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20"> 
  <div className="container mx-auto py-4">
    {/* Banner Section */}
    <div className='relative w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[100px] mb-4 rounded-2xl overflow-hidden'>
      <Image
        src="/images/organic-breadcrumb.png"
        alt={"Organic Farm"}
        fill
        className='object-cover object-center rounded-2xl'
        priority
        quality={100}
      />
      {/* Overlay với breadcrumb */}
      <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
        <div className='text-white space-y-2 text-center px-2 text-sm sm:text-base'>
          <div className='flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm'>
            <Link href="/" className='hover:text-green-400 transition-colors'>
              Trang chủ
            </Link>
            <span>›</span>
            <Link href="/gioi_thieu" className='text-lime-400 transition-colors'>
              Giới thiệu
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Main content */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
      {/* Text content */}
      <div className="lg:col-span-4 space-y-4 text-justify px-2">
        <h2 className="text-xl sm:text-2xl font-semibold">Chào mừng</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          Chúng tôi là một website chuyên cung cấp các loại trái cây tươi ngon và thực phẩm liên quan, 
          mang đến cho bạn sự lựa chọn hoàn hảo để tăng cường sức khỏe và tận hưởng hương vị tự nhiên.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Với sứ mệnh làm việc với các nhà cung cấp đáng tin cậy và trồng trọt bền vững, 
          chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng cao và tươi ngon nhất.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Tại đây, chúng tôi cung cấp một loạt các loại trái cây tươi ngon, từ những loại thông dụng như táo, cam, nho, 
          đến những loại đặc biệt như măng cụt, sầu riêng, quả lựu. Chúng tôi cũng mang đến cho bạn những sản phẩm 
          chế biến từ trái cây như sinh tố, nước ép, mứt và nhiều hơn nữa.
        </p>
      </div>

      {/* Image */}
      <div className="lg:col-span-8 relative h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
        <Image
          src="/images/organic-farm.png"
          alt="Rau củ quả tươi"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</div>

  );
}
