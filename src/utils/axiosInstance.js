import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081", // URL của API
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // <== Thêm dòng này nếu backend yêu cầu credentials
});

// Interceptor để bắt lỗi và xử lý yên lặng
// Interceptor để log hoặc xử lý lỗi ngay lập tức
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // ✅ BẮT NGAY LỖI SỚM Ở ĐÂY
    const errorMessage = error?.message || "Unknown error";

    // 👉 Log ra console nhẹ nhàng
    if (process.env.NODE_ENV === "development") {
      console.warn("[Axios Error]", errorMessage);
    }

    // 👉 Optional: dùng toast hoặc cảnh báo UI (nếu có setup sẵn)
    // toast.error("Lỗi kết nối máy chủ");

    // 👉 Optional: Nếu không muốn lan lỗi lên component (tùy bạn):
    // return Promise.resolve(null); // trả về null để nơi dùng không lỗi
    return Promise.reject(error); // hoặc vẫn ném lỗi để nơi gọi `try/catch`
  }
);

// // Thêm interceptor cho request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Nếu có token, gán vào header
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Thêm interceptor cho response
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Xử lý lỗi 401 (Unauthorized)
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       // Ví dụ: Chuyển hướng đến trang đăng nhập
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
