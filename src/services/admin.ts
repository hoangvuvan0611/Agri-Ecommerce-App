import axiosInstance from '@/utils/axiosInstance';
import { Product, Order, User, StatisticsOverview, SalesData, CategoryData, TopProduct } from '@/types/admin';

// Product APIs
export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/api/v1/admin/products');
    return response.data;
  },
  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await axiosInstance.post('/api/v1/admin/products', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await axiosInstance.put(`/api/v1/admin/products/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/admin/products/${id}`);
  },
};

// Order APIs
export const orderService = {
  getAll: async (): Promise<Order[]> => {
    const response = await axiosInstance.get('/api/v1/admin/orders');
    return response.data;
  },
  getById: async (id: number): Promise<Order> => {
    const response = await axiosInstance.get(`/api/v1/admin/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: number, status: Order['status']): Promise<Order> => {
    const response = await axiosInstance.put(`/api/v1/admin/orders/${id}/status`, { status });
    return response.data;
  },
};

// User APIs
export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/api/v1/admin/users');
    return response.data;
  },
  create: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const response = await axiosInstance.post('/api/v1/admin/users', data);
    return response.data;
  },
  update: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.put(`/api/v1/admin/users/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/admin/users/${id}`);
  },
};

// Statistics APIs
export const statisticsService = {
  getOverview: async (): Promise<StatisticsOverview> => {
    const response = await axiosInstance.get('/api/v1/admin/statistics/overview');
    return response.data;
  },
  getSalesData: async (period: string): Promise<SalesData[]> => {
    const response = await axiosInstance.get(`/api/v1/admin/statistics/sales?period=${period}`);
    return response.data;
  },
  getRevenueData: async (period: string): Promise<SalesData[]> => {
    const response = await axiosInstance.get(`/api/v1/admin/statistics/revenue?period=${period}`);
    return response.data;
  },
  getCategoryData: async (): Promise<CategoryData[]> => {
    const response = await axiosInstance.get('/api/v1/admin/statistics/categories');
    return response.data;
  },
  getTopProducts: async (): Promise<TopProduct[]> => {
    const response = await axiosInstance.get('/api/v1/admin/statistics/top-products');
    return response.data;
  },
}; 