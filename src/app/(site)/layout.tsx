import FooterSection from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header";
import BackToTopButton from "@/components/ui/backToTopButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='sticky top-0 z-50 xl:mx-20'>
        <Header/>
      </div>
      <div className="flex-grow">
        {children}
        <BackToTopButton />
      </div>
      <div>
        <FooterSection/>
      </div>
    </>
  );
}
