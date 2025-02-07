import { REF_HOME } from "@/lib/constants";
import Image from "next/image";

export function Logo() {
    return (
        <a href={REF_HOME}>
            <Image src={'https://fruitio.monamedia.net/wp-content/uploads/2024/04/Mona-Media-e1712831506867.png'} alt={"Logo"} width={80} height={80}/>
        </a>
    );
}