import FooterSection from "@/components/layout/footer/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán | Dora Agri",
  description: "Thanh toán đơn hàng của bạn",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    {children}
    <FooterSection/>
  </>;
} 