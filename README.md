# NEXTJS PROJECT - AGRI-ECOMMERCE-APP

## Create project nextjs:
- Install nvm: https://www.geeksforgeeks.org/how-to-install-and-use-nvm-on-windows/
- Install node version 22.13.1: nvm install 22.13.1
- Use new node version: nvm use 22.13.1
- Create Nextjs App: create-next-app@latest agri-ecommerce-app

## Setup nextjs app:
- Step setup:
  - Would you like to use TypeScript with this project? yes/no  || Sử dụng TypeScript trong dự án, giúp viết code an toàn với kiểu dữ liệu rõ ràng.
  - Would you like to use ESLint with this project? yes/no   || Tích hợp ESLint, công cụ kiểm tra và đảm bảo chất lượng code, giúp phát hiện các lỗi code và tuân thủ các quy tắc coding style
  - Would you like to use Tailwind CSS with this project? yes/no   || Tích hợp Tylwind CSS, do project có sử dụng Shadcn/ui (Shadcn sử dụng Tailwind Css) nên chọn yes để đảm bảo tích tương thích
  - Would you like to use the App Router (recommended)? yes/no   || Sử dụng App Router, được tích hợp từ nextjs 13, có những cải tiến đáng kể so với Pages Router truyền thống.
  - Would you like to customize the default import alias? yes/no  || Tùy chỉnh đường dẫn tắt khi import module

## Install Shadcn/ui:
- npx shadcn-ui@latest init
- Step:
  - Which style would you like to use? Default/New York   || Style New Work font sẽ nhỏ hơn
  - Which color would you like to use as the base color?     || Chọn màu mặc định cho project

## Project Architecture: 
```
/agri-ecommerce-app
│── /public              # Chứa ảnh, favicon, file tĩnh
│── /src                 # Tách mã nguồn (Best practice)
│   ├── /app             # (Nếu dùng App Router - Next.js 13+)
│   │   ├── layout.tsx   # Layout chung
│   │   ├── page.tsx     # Trang chính (Home)
│   │   ├── /dashboard   # Trang quản trị
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   └── /products    # Trang sản phẩm
│   │       ├── page.tsx
│   │       ├── [id].tsx # Chi tiết sản phẩm (dynamic route)
│   ├── /components      # Component UI có thể tái sử dụng
│   │   ├── Button.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   ├── /hooks           # Custom Hooks (useAuth, useCart)
│   ├── /lib             # Chứa file logic như API, helpers
│   │   ├── api.ts       # Gọi API từ server
│   │   ├── auth.ts      # Xử lý xác thực
│   ├── /providers       # Context API, Zustand hoặc Redux Providers
│   ├── /styles         # Chứa file CSS/Tailwind
│   │   ├── globals.css  # Styles toàn cục
│   ├── /utils           # Hàm tiện ích chung (formatDate, debounce)
│   ├── /config          # Biến môi trường, config constants
│   ├── /types           # Định nghĩa TypeScript types
│   ├── /services        # Gọi API từ backend (axios, fetch)
│   ├── /store           # Quản lý trạng thái (Redux/Zustand)
│── /node_modules        # Thư viện npm
│── .env                 # Biến môi trường
│── next.config.js       # Cấu hình Next.js
│── package.json         # Khai báo dependencies
│── tsconfig.json        # Cấu hình TypeScript
```
