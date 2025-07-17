'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Facebook, Mail, MapPin, Phone, Twitter } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  content: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    try {
      // Gửi form đi
      await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call
      toast.success('Gửi liên hệ thành công!');
      setFormData({ name: '', email: '', content: '' });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error('Error submitting contact form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="mx-4 sm:mx-8 lg:mx-20">
  <div className="container mx-auto py-4">
    {/* Banner Section */}
    <div className="relative w-full h-[100px] mb-4 rounded-2xl overflow-hidden">
      <Image
        src={`/images/organic-breadcrumb.png`}
        alt={"Organic Farm"}
        fill
        className="object-cover object-center rounded-2xl"
        priority
        quality={100}
      />
      {/* Overlay với breadcrumb */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-white space-y-2 text-center">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:text-green-400 transition-colors">
              Trang chủ
            </Link>
            <span>›</span>
            <Link href="/lien_he" className="text-lime-400 transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Info */}
      <div className="lg:col-span-1 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-lime-600 mt-1" />
              <div>
                <h3 className="font-semibold">Địa chỉ</h3>
                <p className="text-gray-600">TT Trâu Quỳ, H.Gia Lâm, TP.Hà Nội</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-lime-600 mt-1" />
              <div>
                <h3 className="font-semibold">Điện thoại</h3>
                <p className="text-gray-600">(+84) 0398-128-898</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-lime-600 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">hoangvuvan677@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Mạng xã hội</h2>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-lime-100 transition-colors">
              <Facebook className="w-5 h-5 text-lime-600" />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-lime-100 transition-colors">
              <Twitter className="w-5 h-5 text-lime-600" />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-lime-100 transition-colors">
              <Mail className="w-5 h-5 text-lime-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Gửi liên hệ</h2>
          <p className="text-gray-600 mb-8">
            Nếu bạn có thắc mắc gì hoặc có bất cứ câu hỏi nào cứ liên hệ cho chúng tôi để biết thêm chi tiết. Chúng tôi hỗ trợ 24/7
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-lime-600 hover:bg-lime-700"
              disabled={isLoading}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi liên hệ'}
            </Button>
          </form>
        </div>
      </div>
    </div>

    {/* Map */}
    <div className="mt-12">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6901689612982!2d105.93176430000003!3d21.005053300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a94c1f882977%3A0x6d016e6656923f46!2zSOG7jWMgdmnhu4duIE7DtG5nIE5naGnhu4dwIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1744023456788!5m2!1svi!2s" 
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
      />
    </div>
  </div>
</div>

  );
}