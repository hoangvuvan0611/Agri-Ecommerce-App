import axiosInstance from "@/utils/axiosInstance";

interface UserInteraction {
  type: 'view' | 'cart' | 'purchase';
  productId: string;
  timestamp: string;
}

class UserInteractionService {
  private async recordInteraction(type: 'view' | 'cart' | 'purchase', userId: string | null, productId: string) {
    try {
      if (userId) {
        await axiosInstance.post(`/api/user-interactions/${type}`, {
          userId,
          productId,
        });
      } else {
        // Lưu tương tác vào localStorage nếu chưa đăng nhập
        const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        interactions.push({
          type,
          productId,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('userInteractions', JSON.stringify(interactions));
      }
    } catch (error) {
      console.error(`Error recording ${type} interaction:`, error);
    }
  }

  async recordView(userId: string | null, productId: string) {
    await this.recordInteraction('view', userId, productId);
  }

  async recordCart(userId: string | null, productId: string) {
    await this.recordInteraction('cart', userId, productId);
  }

  async recordPurchase(userId: string | null, productId: string) {
    await this.recordInteraction('purchase', userId, productId);
  }

  async getRecommendations(userId: string | null): Promise<any[]> {
    try {
      if (userId) {
        const response = await axiosInstance.get(`/api/user-interactions/recommendations?userId=${userId}`);
        return response.data;
      } else {
        // Lấy tương tác từ localStorage nếu chưa đăng nhập
        const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        if (interactions.length === 0) {
          return [];
        }

        // Gửi tương tác từ localStorage lên server để lấy gợi ý
        const response = await axiosInstance.post('/api/user-interactions/recommendations/guest', {
          interactions
        });
        return response.data;
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }

  // Hàm đồng bộ tương tác từ localStorage khi người dùng đăng nhập
  async syncLocalInteractions(userId: number) {
    try {
      const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
      if (interactions.length > 0) {
        await axiosInstance.post('/api/user-interactions/sync', {
          userId,
          interactions
        });
        // Xóa tương tác đã đồng bộ
        localStorage.removeItem('userInteractions');
      }
    } catch (error) {
      console.error('Error syncing local interactions:', error);
    }
  }
}

export const userInteractionService = new UserInteractionService(); 