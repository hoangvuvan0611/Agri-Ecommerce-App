import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { activityLogService } from '@/services/activityLogService';

export function useActivityLog() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Tự động log khi chuyển trang
  useEffect(() => {
    const pageTitle = document.title;
    const referrer = document.referrer;
    
    // Lấy product_id từ URL nếu có
    const productIdMatch = pathname.match(/\/san-pham\/(\d+)/);
    if (productIdMatch) {
      const productId = parseInt(productIdMatch[1]);
      activityLogService.logView(productId);
    }
  }, [pathname, searchParams]);

  return {
    logView: activityLogService.logView.bind(activityLogService),
    logSearch: activityLogService.logSearch.bind(activityLogService),
    logCartAction: activityLogService.logCartAction.bind(activityLogService),
    logCheckout: activityLogService.logCheckout.bind(activityLogService),
    logFilter: activityLogService.logFilter.bind(activityLogService),
    logSort: activityLogService.logSort.bind(activityLogService),
    logWishlist: activityLogService.logWishlist.bind(activityLogService),
    logAuth: activityLogService.logAuth.bind(activityLogService),
  };
} 