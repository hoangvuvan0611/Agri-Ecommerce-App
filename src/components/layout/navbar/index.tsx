import { PAGE_ABOUT, PAGE_CONTACT, PAGE_HOME, PAGE_NEWS, PAGE_PRODUCT, REF_ABOUT, REF_CONTACT, REF_HOME, REF_NEWS, REF_PRODUCT } from "@/lib/constants";
import { NavigationType } from "./type";
import { List } from "lucide-react";

const navigation: NavigationType[] = [
    { id: 1, name: PAGE_HOME, href: REF_HOME},
    { id: 2, name: PAGE_ABOUT, href: REF_ABOUT},
    { id: 3, name: PAGE_PRODUCT, href: REF_PRODUCT},
    { id: 4, name: PAGE_NEWS, href: REF_NEWS},
    { id: 5, name: PAGE_CONTACT, href: REF_CONTACT},
];

export function Navbar() {
    return (
        <div className="container flex mx-auto items-center space-x-6">
            <div className="flex items-center space-x-2 bg-lime-600 text-white px-3 py-1.5 rounded-t-lg">
                <List size={20}/>
                <span className="text-sm">Danh mục sản phẩm</span>
            </div>
            <nav className="flex space-x-4">
                {navigation.map((item: NavigationType) => (
                    <a
                        href={item.href}
                        key={item.id}
                        className="text-sm"
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
        </div>
    );
};