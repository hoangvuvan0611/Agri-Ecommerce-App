export default function FooterSection() {
    return (
        <footer className="bg-gray-100 mt-6 w-full">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between py-8 md:py-10 gap-6 md:gap-0">
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
            <div className="bg-white border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0 px-2 sm:px-4 md:px-8"> 
                    <div>
                        @ Phát triển bởi 🐐 VVHOANG
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4 py-2 md:py-0">
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