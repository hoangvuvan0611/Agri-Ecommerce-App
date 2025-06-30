export interface Product {
  id: string;
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
  id: string;
  customerId: number;
  status: 'PENDING' | 'PROCESSING'  | 'SHIPPED' | 'CANCELLED' | 'RETURNED' | 'COMPLETED' ;
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
  customerName: string;
  customer: {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  },
  orderItemList: {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    path: string;
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

export interface Category {
  id: string;
  name: string;
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