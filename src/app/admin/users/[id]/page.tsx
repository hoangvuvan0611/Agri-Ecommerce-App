"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock service, thay bằng API thực tế nếu có
const mockUser = {
  id: 1,
  name: "Vũ Văn Hoàng",
  email: "hoangvuvan677@gmail.com",
  role: "admin",
  status: "active",
  joinDate: "04/05/2025",
};

const ROLES = [
  { value: "admin", label: "Quản trị viên" },
  { value: "user", label: "Người dùng" },
  { value: "manager", label: "Quản lý" },
];
const STATUSES = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Không hoạt động" },
];

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [joinDate, setJoinDate] = useState("");

  useEffect(() => {
    // TODO: Gọi API lấy thông tin user theo params.id
    setLoading(true);
    setTimeout(() => {
      setFormData({
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        status: mockUser.status,
      });
      setJoinDate(mockUser.joinDate);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên và email");
      return;
    }
    // TODO: Gọi API cập nhật user
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Cập nhật thông tin người dùng thành công");
      router.push("/admin/users");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chỉnh sửa người dùng</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Quay lại
        </Button>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên người dùng</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Ngày tham gia</Label>
            <Input value={joinDate} disabled />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 