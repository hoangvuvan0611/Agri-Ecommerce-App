import Image from "next/image";

interface BannerImageProps {
    image: string;
    title: string;
    titleStyle?: React.CSSProperties;
    content: string;
    contentStyle?: React.CSSProperties;
}

export default function BannerImage({image, title, titleStyle, content, contentStyle}: BannerImageProps) {
    return (
        <div className="p-4 my-8 h-40 text-center content-center relative rounded-2xl">
            <div className="absolute inset-0 -z-10  rounded-xl">
                <Image
                    src={image}
                    layout="fill"
                    alt="Banner Image"
                    objectFit="cover"
                    priority={false}
                    objectPosition="center"
                    quality={100}
                    className="rounded-xl"
                />
            </div>
            <div>
                <h3 className="" style={titleStyle}>{title}</h3>
                <p style={contentStyle}>{content}</p>
            </div>
        </div>
    );
}