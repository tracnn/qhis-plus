// const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   let accessToken = localStorage.getItem("accessToken");
//   let refreshToken = localStorage.getItem("refreshToken");

//   // Gọi API với accessToken
//   let res = await fetch(url, {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   // Nếu token hết hạn, thử refresh
//   if (res.status === 401 && refreshToken) {
//     // Gọi API refresh
//     const refreshRes = await fetch(`${backendUrl}/api/auth/refresh`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken }),
//     });
//     if (refreshRes.ok) {
//       const { accessToken: newAccessToken } = await refreshRes.json();
//       localStorage.setItem("accessToken", newAccessToken);
//       // Thử lại request ban đầu với accessToken mới
//       res = await fetch(url, {
//         ...options,
//         headers: {
//           ...(options.headers || {}),
//           Authorization: `Bearer ${newAccessToken}`,
//         },
//       });
//     } else {
//       // Refresh token cũng hết hạn, cần đăng nhập lại
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
//     }
//   }

//   return res;
// } 