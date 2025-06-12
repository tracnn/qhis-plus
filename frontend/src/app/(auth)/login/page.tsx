"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const inter = Inter({ subsets: ["latin", "vietnamese"], weight: ["400", "700"] });
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Khi load trang, kiểm tra localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    if (savedUsername && savedRemember) {
      setFormData((prev) => ({ ...prev, username: savedUsername }));
      setRemember(true);
    }
  }, []);

  async function login(username: string, password: string) {
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Sai tài khoản hoặc mật khẩu");
    }
    return res.json(); // { accessToken, refreshToken }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await login(formData.username, formData.password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Xử lý ghi nhớ
      if (remember) {
        localStorage.setItem("rememberedUsername", formData.username);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberMe");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl ${inter.className}`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Chào mừng bạn quay trở lại</h1>
        <p className="mt-2 text-sm text-gray-600">Đăng nhập để tiếp tục</p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
            Ghi nhớ tôi
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
} 