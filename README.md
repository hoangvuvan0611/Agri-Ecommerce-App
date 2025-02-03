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
my-ecommerce-app/
│
├── public/
│   ├── images/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Button.js
│   │   │   └── Card.js
│   │   ├── layout/
│   │   │   └── Layout.js
│   │   └── products/
│   │       ├── ProductList.js
│   │       └── ProductDetail.js
│   ├── pages/
│   │   ├── api/
│   │   │   └── products.js
│   │   ├── index.js
│   │   ├── products/
│   │   │   ├── index.js
│   │   │   └── [id].js
│   │   └── cart.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── Home.module.css
│   │   └── Product.module.css
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   └── context/
│       └── CartContext.js
│
├── next.config.js
├── package.json
└── README.md
