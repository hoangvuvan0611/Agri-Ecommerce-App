import FooterSection from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className='sticky top-0 z-50 mx-20'>
            <Header/>
        </div>
        <div className="flex-grow">
            {children}
        </div>
        <div>
            <FooterSection/>
        </div>
    </>
  );
}
