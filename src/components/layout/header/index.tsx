'use client';
import { User } from "lucide-react";
import { Logo } from "@/components/logo";
import { Navbar } from "../navbar";
import { useEffect, useState } from "react";
import { CartDropdown } from '@/components/cart/CartDropdown';
import { SearchBar } from '@/components/search/SearchBar';

export function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => setDropdownOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="container rounded-xl bg-white px-4">
      {/* Main header content - always visible */}
      <div className="flex h-16 items-center justify-between">
        <div className="flex justify-around space-x-16">
          {/* Logo app */}
          <Logo />

          {/* Search place */}
          <SearchBar />
        </div>

        {/* control place */}
        <div className="flex items-end space-x-8">
          <CartDropdown />
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

      {/* Navbar with animation: Thanh dieu huong cac page */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'h-0 opacity-0 invisible' 
            : 'h-16 opacity-100 visible'
        }`}
      >
        <Navbar/>
      </div>
    </header>
  );
}