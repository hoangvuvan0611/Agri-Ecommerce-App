'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', formData);
      if (response.data) {
        toast.success('Đăng nhập thành công!');
        router.push('/'); // Chuyển về trang chủ sau khi đăng nhập
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2 bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo và tiêu đề */}
        <div className="text-center">
          <Link href="/">
            <div className="relative w-32 h-20 mx-auto">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="mt-2 text-xs text-gray-600">
            Hoặc{' '}
            <Link href="/register" className="font-medium text-lime-600 hover:text-lime-500">
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                placeholder="Email của bạn"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu của bạn"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-lime-600 hover:text-lime-500">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 