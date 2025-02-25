import { REF_HOME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <Link href={REF_HOME}>
            <Image 
                src={'/logo/logo.png'}
                alt={"Logo"}
                width={150}
                height={200}
                priority={true}
                quality={100}
            />
        </Link>
    );
}