import { Order } from '@/types/admin';

export const mockOrders: Order[] = [
  {
    id: 1,
    customer_id: 101,
    status: 'pending',
    shipping_fee: 30000,
    delivery_info_id: 1,
    total_fee: 450000,
    payment_id: 1,
    coupon_id: null,
    affiliate_id: null,
    created_at: "2024-03-15T10:30:00Z",
    canceled_at: null,
    completed_at: null,
    delivery_at: null,
    updated_at: "2024-03-15T10:30:00Z",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0987654321"
    },
    items: [
      {
        id: 1,
        productId: 1,
        name: "Rau muống hữu cơ",
        price: 15000,
        quantity: 2,
        images: ["/images/rau-muong.jpg"],
        category: "Rau xanh"
      },
      {
        id: 2,
        productId: 2,
        name: "Cà chua hữu cơ",
        price: 25000,
        quantity: 3,
        images: ["/images/ca-chua.jpg"],
        category: "Rau củ"
      }
    ],
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    paymentMethod: "COD"
  },
  {
    id: 2,
    customer_id: 102,
    status: 'processing',
    shipping_fee: 35000,
    delivery_info_id: 2,
    total_fee: 785000,
    payment_id: 2,
    coupon_id: null,
    affiliate_id: null,
    created_at: "2024-03-14T15:45:00Z",
    canceled_at: null,
    completed_at: null,
    delivery_at: "2024-03-16T10:00:00Z",
    updated_at: "2024-03-14T16:30:00Z",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678"
    },
    items: [
      {
        id: 3,
        productId: 3,
        name: "Thịt heo sạch",
        price: 150000,
        quantity: 1,
        images: ["/images/thit-heo.jpg"],
        category: "Thịt"
      },
      {
        id: 4,
        productId: 4,
        name: "Cá hồi tươi",
        price: 300000,
        quantity: 2,
        images: ["/images/ca-hoi.jpg"],
        category: "Thủy hải sản"
      }
    ],
    shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM",
    paymentMethod: "BANK_TRANSFER"
  },
  {
    id: 3,
    customer_id: 103,
    status: 'completed',
    shipping_fee: 40000,
    delivery_info_id: 3,
    total_fee: 1200000,
    payment_id: 3,
    coupon_id: null,
    affiliate_id: null,
    created_at: "2024-03-13T09:15:00Z",
    canceled_at: null,
    completed_at: "2024-03-14T11:20:00Z",
    delivery_at: "2024-03-14T10:00:00Z",
    updated_at: "2024-03-14T11:20:00Z",
    customer: {
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0978123456"
    },
    items: [
      {
        id: 5,
        productId: 5,
        name: "Trái cây mix",
        price: 200000,
        quantity: 1,
        images: ["/images/trai-cay.jpg"],
        category: "Trái cây"
      },
      {
        id: 6,
        productId: 6,
        name: "Rau củ mix",
        price: 150000,
        quantity: 2,
        images: ["/images/rau-cu.jpg"],
        category: "Rau củ"
      }
    ],
    shippingAddress: "789 Đường DEF, Quận 3, TP.HCM",
    paymentMethod: "CREDIT_CARD"
  },
  {
    id: 4,
    customer_id: 104,
    status: 'cancelled',
    shipping_fee: 30000,
    delivery_info_id: 4,
    total_fee: 250000,
    payment_id: 4,
    coupon_id: null,
    affiliate_id: null,
    created_at: "2024-03-12T14:20:00Z",
    canceled_at: "2024-03-13T16:45:00Z",
    completed_at: null,
    delivery_at: null,
    updated_at: "2024-03-13T16:45:00Z",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0965432187"
    },
    items: [
      {
        id: 7,
        productId: 7,
        name: "Rau mầm hữu cơ",
        price: 20000,
        quantity: 5,
        images: ["/images/rau-mam.jpg"],
        category: "Rau xanh"
      },
      {
        id: 8,
        productId: 8,
        name: "Nấm tươi",
        price: 50000,
        quantity: 3,
        images: ["/images/nam.jpg"],
        category: "Rau củ"
      }
    ],
    shippingAddress: "321 Đường GHI, Quận 4, TP.HCM",
    paymentMethod: "COD"
  }
]; 