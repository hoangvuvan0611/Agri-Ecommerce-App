import { REF_HOME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <Link href={REF_HOME}>
            <Image 
                src={'https://fruitio.monamedia.net/wp-content/uploads/2024/04/Mona-Media-e1712831506867.png'} alt={"Logo"}
                width={150} height={200}
            />
        </Link>
    );
}