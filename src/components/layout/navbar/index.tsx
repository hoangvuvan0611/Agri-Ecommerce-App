'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { List } from "lucide-react";
import { PAGE_ABOUT, PAGE_CONTACT, PAGE_HOME, PAGE_NEWS, PAGE_PRODUCT, REF_ABOUT, REF_CONTACT, REF_HOME, REF_NEWS, REF_PRODUCT } from "@/lib/constants";
import { NavigationType } from "./type";
import Link from 'next/link';

const navigation: NavigationType[] = [
    { id: 1, name: PAGE_HOME, href: REF_HOME},
    { id: 2, name: PAGE_ABOUT, href: REF_ABOUT},
    { id: 3, name: PAGE_PRODUCT, href: REF_PRODUCT},
    { id: 4, name: PAGE_NEWS, href: REF_NEWS},
    { id: 5, name: PAGE_CONTACT, href: REF_CONTACT},
];

const categories = [
    { id: 1, name: 'Hoa quả - Fruits', icon: '🍎' },
    { id: 2, name: 'Rau xanh - Vegetables', icon: '🥬' },
    { id: 3, name: 'Drinks', icon: '🥤' },
    { id: 4, name: 'Butter & Egges', icon: '🥚' },
    { id: 5, name: 'Trees', icon: '🌳' },
    { id: 6, name: 'Cakes', icon: '🍰' },
    { id: 7, name: 'Meats', icon: '🥩' },
    { id: 8, name: 'Fish', icon: '🐟' },
    { id: 9, name: 'Onions', icon: '🧅' },
    { id: 10, name: 'Grapes', icon: '🍇' },
];

export function Navbar() {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    return (
        <div className="container mx-auto relative">
            <div className="flex items-center space-x-6">
                {/* Categories dropdown */}
                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={`flex items-center space-x-2 bg-lime-600 text-white px-3 py-1.5 rounded-t-lg cursor-pointer ${isHovered ? 'rounded-b-none' : 'rounded-b-lg'}`}>
                        <List size={20}/>
                        <span className="text-base font-medium">Danh mục sản phẩm</span>
                    </div>

                    {/* Dropdown menu with animation */}
                    <div 
                        className={`absolute z-50 w-64 bg-white border border-gray-200 rounded-b-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top ${
                            isHovered 
                            ? 'opacity-100 scale-y-100 translate-y-0' 
                            : 'opacity-0 scale-y-0 -translate-y-2'
                        }`}
                    >
                        <div className="py-1">
                            {categories.map((category, index) => (
                                <a
                                    key={category.id}
                                    href="#"
                                    className={`
                                        flex items-center space-x-3 px-4 py-2 text-gray-700 
                                        hover:bg-lime-600 transition-all duration-100 
                                        hover:text-white
                                        ${isHovered
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-2'
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 30}ms`
                                    }}
                                >
                                    <span className="text-lg">{category.icon}</span>
                                    <span className="text-sm ">{category.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation links */}
                <nav className="flex space-x-4">
                    {navigation.map((item: NavigationType) => (
                        <Link
                            href={item.href}
                            key={item.id}
                            className={`text-base font-bold text-gray-700 hover:text-lime-600 relative
                                ${pathname === item.href || (pathname === '/' && item.href === '/') 
                                    ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:rounded-xl" 
                                    : "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-lime-600 after:transform after:scale-x-0 hover:after:scale-x-[2] after:transition-transform after:duration-300 after:ease-out after:origin-left after:rounded-xl"
                                }`
                            }
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}


