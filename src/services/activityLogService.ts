import axiosInstance from "@/utils/axiosInstance";

export type ActionType = 
  | 'view'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout'
  | 'filter'
  | 'sort'
  | 'wishlist'
  | 'login'
  | 'logout'
  | 'register';

interface ActionPayload {
  user_id: string | null;
  session_id: string;
  product_id?: string;
  action_type: ActionType;
  search_term?: string;
  category_id?: number;
  price?: number;
  quantity?: number;
  filters?: Record<string, string | number | boolean>;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

class ActivityLogService {
  private getSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private async recordAction(payload: ActionPayload) {
    try {
      await axiosInstance.post('http://localhost:5000/api/record-action', payload);
    } catch (error) {
      console.error('Lỗi khi ghi nhận hành động:', error);
    }
  }

  // Các phương thức tiện ích cho từng loại hành động
  async logView(productId: string) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      product_id: productId,
      action_type: 'view'
    });
  }

  async logSearch(searchTerm: string) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      action_type: 'search',
      search_term: searchTerm
    });
  }

  async logCartAction(actionType: 'add_to_cart' | 'remove_from_cart', productId: string) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      product_id: productId,
      action_type: actionType
    });
  }

  async logCheckout(productId: string) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      product_id: productId,
      action_type: 'checkout'
    });
  }

  async logFilter(filters: Record<string, string | number | boolean>) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      action_type: 'filter',
      filters
    });
  }

  async logSort(sortBy: string, sortOrder: 'asc' | 'desc') {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      action_type: 'sort',
      sort_by: sortBy,
      sort_order: sortOrder
    });
  }

  async logWishlist(productId: number) {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      product_id: productId,
      action_type: 'wishlist'
    });
  }

  async logAuth(actionType: 'login' | 'logout' | 'register') {
    await this.recordAction({
      user_id: localStorage.getItem('userId'),
      session_id: this.getSessionId(),
      action_type: actionType
    });
  }
}

export const activityLogService = new ActivityLogService(); 