'use client';
import { Logo } from "@/components/logo";
import { Navbar } from "../navbar";
import { CartDropdown } from '@/components/cart/CartDropdown';
import { SearchBar } from '@/components/search/SearchBar';
import { useEffect, useState } from "react";
import { Menu } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

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
    <header className="w-full xl:container rounded-xl bg-white shadow-sm px-2 sm:px-4 z-50 relative">
      <div className="w-full flex h-16 items-center justify-between">
        {/* Bên trái: nút menu + logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="md:hidden p-2 mr-1" onClick={() => setShowMobileNav(!showMobileNav)}>
            <Menu size={28} />
          </button>
          <Logo />
        </div>
        {/* Search chỉ hiện trên desktop */}
        <div className="hidden md:flex justify-center py-2">
          <SearchBar />
        </div>
        {/* Bên phải: giỏ hàng */}
        <div className="flex items-center gap-2 sm:gap-4">
          <CartDropdown />
          {/* <div className="relative">
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
          </div> */}
        </div>
      </div>
      {/* Navbar desktop */}
      <div
        className={`transition-all duration-500 ease-in-out hidden md:block ${
          isScrolled
            ? 'h-0 opacity-0 invisible'
            : 'h-12 md:h-16 opacity-100 visible'
        }`}
      >
        <Navbar/>
      </div>
      {/* Navbar mobile */}
      {showMobileNav && (
        <div className="block md:hidden fixed inset-0 z-[999] bg-black bg-opacity-40" onClick={() => setShowMobileNav(false)}>
          <div
            className="absolute top-0 left-0 h-full bg-white shadow-lg p-4 transition-transform duration-500 ease-in-out"
            style={{
              width: '75vw',
              maxWidth: '320px',
              transform: showMobileNav ? 'translateX(0)' : 'translateX(-100%)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <Logo />
            </div>
            <Navbar mobile={true} />
          </div>
        </div>
      )}
    </header>
  );
}