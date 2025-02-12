'use client';
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Navbar } from "../navbar";
import { useEffect, useState } from "react";

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => setDropdownOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      {/* Main header content - always visible */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex justify-around space-x-16">
          {/* Logo app */}
          <Logo />

          {/* Search place */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              type="text"
              className="pl-8 w-52 md:w-[700px] border focus:outline-none focus:ring-0 focus:border-none"
            />
            <Button className="absolute right-0 top-0 bg-lime-600 hover:bg-lime-700">
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* control place */}
        <div className="flex items-end space-x-8">
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <ShoppingCart className="!h-10 !w-10 p-2" role="button" color="gray"/>
          </Button>
          <div className="relative">
            {isLogin ? (
              <div
                role="button"
                className="flex space-x-2 items-center hover:bg-gray-100 p-2 rounded-lg"
                onClick={toggleDropdown}
              >
                <User className="" role="button" color="gray"/>
                <span className="text-gray-500">Tài khoản</span>
              </div>
            ) : (
              <div className="flex space-x-0.5 justify-between items-center cursor-pointer">
                <a href="/login" className="block px-1 py-2 text-gray-800 hover:text-lime-400">Đăng nhập</a>
                <p>|</p>
                <a href="/register" className="block px-1 py-2 text-gray-800 hover:text-lime-400">Đăng ký</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar with animation */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'max-h-0 opacity-0' 
            : 'max-h-16 opacity-100'
        }`}
      >
        <Navbar/>
      </div>
    </header>
  );
}