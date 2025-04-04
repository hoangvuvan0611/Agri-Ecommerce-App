export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  images: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    category: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface StatisticsOverview {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  usersChange: number;
}

export interface SalesData {
  name: string;
  value: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface TopProduct {
  id: number;
  name: string;
  image: string;
  sales: number;
  revenue: number;
} 