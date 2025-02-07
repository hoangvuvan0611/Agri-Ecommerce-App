import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Navbar } from "../navbar";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Logo app */}
          <Logo />
          
          {/* Navbar */}
          <Navbar/>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-8 w-[200px] md:w-[300px]"
            />
          </div>
          <Button variant="ghost">Đăng nhập</Button>
          <Button>Giỏ hàng</Button>
        </div>
      </div>
    </header>
  )
}