export interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  salePrice?: number;
  quantity: number;
  category: string;
  images: string[];
  path: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customerId: number;
  status: 'PENDING' | 'PROCESSING'  | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED' | 'ON_HOLD' | 'COMPLETED' | 'FAILED';
  shippingFee: number;
  deliveryInfoId: number;
  totalFee: number;
  paymentId: number | null;
  couponId: number | null;
  affiliateId: number | null;
  createdAt: string;
  canceledAt: string | null;
  completedAt: string | null;
  deliveryAt: string | null;
  updatedAt: string;
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

export interface City {
  id: string;
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
  city: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Ward {
  id: string;
  name: string;
  code: string;
  districtId: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
} 