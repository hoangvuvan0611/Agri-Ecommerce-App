export interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  salePrice?: number;
  quantity: number;
  category: string;
  images: string[];
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customer_id: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shipping_fee: number;
  delivery_info_id: number;
  total_fee: number;
  payment_id: number | null;
  coupon_id: number | null;
  affiliate_id: number | null;
  created_at: string;
  canceled_at: string | null;
  completed_at: string | null;
  delivery_at: string | null;
  updated_at: string;
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
  shippingAddress: string;
  paymentMethod: string;
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

export interface Province {
  id: number;
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface District {
  id: number;
  name: string;
  code: string;
  provinceId: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Ward {
  id: number;
  name: string;
  code: string;
  districtId: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
} 