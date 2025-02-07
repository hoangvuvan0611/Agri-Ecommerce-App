import { PAGE_ABOUT, PAGE_CONTACT, PAGE_HOME, PAGE_NEWS, PAGE_PRODUCT, REF_ABOUT, REF_CONTACT, REF_HOME, REF_NEWS, REF_PRODUCT } from "@/lib/constants";
import { NavigationType } from "../navbar/type";

const navigation: NavigationType[] = [
    { id: 1, name: PAGE_HOME, href: REF_HOME},
    { id: 2, name: PAGE_ABOUT, href: REF_ABOUT},
    { id: 3, name: PAGE_PRODUCT, href: REF_PRODUCT},
    { id: 4, name: PAGE_NEWS, href: REF_NEWS},
    { id: 5, name: PAGE_CONTACT, href: REF_CONTACT},
];

export function Navbar() {
    return (
        <nav>
            {navigation.map((item: NavigationType) => (
                <a
                    href={item.href}
                    key={item.id}
                >
                    {item.name}
                </a>
            ))}
        </nav>
    );
};