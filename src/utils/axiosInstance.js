import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081", // URL của API
  timeout: 10000, // Thời gian timeout (ms)
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true, // <== Thêm dòng này nếu backend yêu cầu credentials
});

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
