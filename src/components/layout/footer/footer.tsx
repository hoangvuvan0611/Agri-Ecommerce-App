export default function FooterSection() {
    return (
        <footer className="bg-gray-100 mt-6 mx-20">
            <div className="mx-28"> 
                <div className="container mx-auto flex flex-col md:flex-row justify-between py-10">
                    <div>
                        <h4 className="font-bold mb-2">MonaFruit</h4>
                        <p>TT Trâu Quỳ, Gia Lâm, Hà Nội</p>
                        <p>(+84) 099-888-999</p>
                        <p>info@monna.com</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Liên kết</h4>
                        <ul className="space-y-2">
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách hoàn trả</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center bg-white border-t border-gray-200 py-4">
                <div className="container mx-auto flex justify-between items-center text-sm"> 
                    <div className="">
                        @ Phát triển bởi 🐐 VVHOANG
                    </div>
                    <div className="flex gap-4 py-8">
                        <div>Điều khoản & Điều kiện</div>
                        <div>Chính sách bảo mật</div>
                        <div>Chính sách giao hàng</div>
                        <div>Giới thiệu</div>
                    </div>
                </div>           
            </div>
        </footer>
    );
}