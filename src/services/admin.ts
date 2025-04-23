import axiosInstance from '@/utils/axiosInstance';
import { Product, Order, User, StatisticsOverview, SalesData, CategoryData, TopProduct, Province, District, Ward } from '@/types/admin';
import { mockOrders } from '@/mocks/orders';

// Product APIs
export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/api/v1/product/all');
    return response.data;
  },
  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await axiosInstance.post('/api/v1/products', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await axiosInstance.put(`/api/v1/product/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/product/${id}`);
  },
  getTotalProducts: async (): Promise<number> => {
    const response = await axiosInstance.get('/api/v1/product/total');
    return response.data.data;
  },
  getManageProducts: async (): Promise<Product[]> => {
    const response = await axiosInstance.get('/api/v1/product/showManagement');
    return response.data.data;
  },
  updateStatus: async (id: number, status: 'ACTIVE' | 'INACTIVE'): Promise<Product> => {
    const response = await axiosInstance.put(`/api/v1/product/${id}/status`, { status });
    return response.data;
  },
};

// Order APIs
export const orderService = {
  getAll: async (): Promise<Order[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockOrders;
  },
  getById: async (id: number): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const order = mockOrders.find(order => order.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },
  updateStatus: async (id: number, status: Order['status']): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const orderIndex = mockOrders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    const updatedOrder = {
      ...mockOrders[orderIndex],
      status,
      updated_at: new Date().toISOString()
    };
    mockOrders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  create: async (data: {
    customer_id: number;
    shipping_fee: number;
    delivery_info_id: number;
    total_fee: number;
    payment_id?: number;
    coupon_id?: number;
    affiliate_id?: number;
    items: { product_id: number; quantity: number; }[];
  }): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newOrder: Order = {
      id: Math.max(...mockOrders.map(order => order.id)) + 1,
      customer_id: data.customer_id,
      status: 'pending',
      shipping_fee: data.shipping_fee,
      delivery_info_id: data.delivery_info_id,
      total_fee: data.total_fee,
      payment_id: data.payment_id || null,
      coupon_id: data.coupon_id || null,
      affiliate_id: data.affiliate_id || null,
      created_at: new Date().toISOString(),
      canceled_at: null,
      completed_at: null,
      delivery_at: null,
      updated_at: new Date().toISOString(),
      customer: {
        name: "Khách hàng mới",
        email: "new@example.com",
        phone: "0123456789"
      },
      items: data.items.map(item => ({
        id: Math.floor(Math.random() * 1000),
        productId: item.product_id,
        name: "Sản phẩm mới",
        price: 0,
        quantity: item.quantity,
        images: [],
        category: "Chưa phân loại"
      })),
      shippingAddress: "Địa chỉ mới",
      paymentMethod: "COD"
    };
    mockOrders.push(newOrder);
    return newOrder;
  },
  cancelOrder: async (id: number): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const orderIndex = mockOrders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    const updatedOrder: Order = {
      ...mockOrders[orderIndex],
      status: 'cancelled' as const,
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockOrders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  completeOrder: async (id: number): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const orderIndex = mockOrders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    const updatedOrder: Order = {
      ...mockOrders[orderIndex],
      status: 'completed' as const,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockOrders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  updateDeliveryInfo: async (id: number, deliveryInfo: {
    delivery_at: string;
    shipping_fee: number;
    delivery_info_id: number;
  }): Promise<Order> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const orderIndex = mockOrders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    const updatedOrder = {
      ...mockOrders[orderIndex],
      delivery_at: deliveryInfo.delivery_at,
      shipping_fee: deliveryInfo.shipping_fee,
      delivery_info_id: deliveryInfo.delivery_info_id,
      updated_at: new Date().toISOString()
    };
    mockOrders[orderIndex] = updatedOrder;
    return updatedOrder;
  },
  getOrderStatistics: async (params: {
    startDate?: string;
    endDate?: string;
    status?: Order['status'];
  }): Promise<{
    total_orders: number;
    total_revenue: number;
    average_order_value: number;
    orders_by_status: { status: Order['status']; count: number; }[];
  }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const filteredOrders = mockOrders.filter(order => {
      if (params.status && order.status !== params.status) return false;
      if (params.startDate && new Date(order.created_at) < new Date(params.startDate)) return false;
      if (params.endDate && new Date(order.created_at) > new Date(params.endDate)) return false;
      return true;
    });

    const total_orders = filteredOrders.length;
    const total_revenue = filteredOrders.reduce((sum, order) => sum + order.total_fee, 0);
    const average_order_value = total_orders > 0 ? total_revenue / total_orders : 0;

    const statusCounts = mockOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<Order['status'], number>);

    const orders_by_status = Object.entries(statusCounts).map(([status, count]) => ({
      status: status as Order['status'],
      count
    }));

    return {
      total_orders,
      total_revenue,
      average_order_value,
      orders_by_status
    };
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

// Province Services
export const provinceService = {
  getAll: async () => {
    const response = await axiosInstance.get('/api/v1/city/showManagement');
    console.log(response)
    return response.data;
  },
  getById: async (id: number) => {
    const response = await fetch(`/api/admin/provinces/${id}`);
    return response.json();
  },
  create: async (data: Omit<Province, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/admin/provinces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id: number, data: Partial<Province>) => {
    const response = await fetch(`/api/admin/provinces/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id: number) => {
    const response = await fetch(`/api/admin/provinces/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// District Services
export const districtService = {
  getAll: async (provinceId?: number) => {
    const url = provinceId 
      ? `/api/admin/districts?provinceId=${provinceId}`
      : '/api/v1/district/showManagement';
    const response = await axiosInstance.get(url);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await fetch(`/api/admin/districts/${id}`);
    return response.json();
  },
  create: async (data: Omit<District, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/admin/districts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id: number, data: Partial<District>) => {
    const response = await fetch(`/api/admin/districts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id: number) => {
    const response = await fetch(`/api/admin/districts/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Ward Services
export const wardService = {
  getAll: async (districtId?: number) => {
    const url = districtId 
      ? `/api/admin/wards?districtId=${districtId}`
      : '/api/admin/wards';
    const response = await fetch(url);
    return response.json();
  },
  getById: async (id: number) => {
    const response = await fetch(`/api/admin/wards/${id}`);
    return response.json();
  },
  create: async (data: Omit<Ward, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/admin/wards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id: number, data: Partial<Ward>) => {
    const response = await fetch(`/api/admin/wards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id: number) => {
    const response = await fetch(`/api/admin/wards/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
}; 