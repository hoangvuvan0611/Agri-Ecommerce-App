'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Vũ Văn Hoàng',
    email: 'hoangvuvan677@gmail.com',
    role: 'admin',
    status: 'active',
    joinDate: '04/05/2025',
  },
  {
    id: 2,
    name: 'Đỗ Ngọc Minh',
    email: 'minhdo543@gmail.com',
    role: 'user',
    status: 'active',
    joinDate: '01/06/2024',
  },
  {
    id: 3,
    name: 'Minh Anh',
    email: 'anhMing@gmail.com',
    role: 'user',
    status: 'inactive',
    joinDate: '27/05/2025',
  },
  {
    id: 4,
    name: 'Dương Văn Minh',
    email: 'minhdv@gmail.com',
    role: 'manager',
    status: 'active',
    joinDate: '01/06/2024',
  },
  {
    id: 5,
    name: 'Lê Văn An',
    email: 'levanan@gmail.com',
    role: 'user',
    status: 'inactive',
    joinDate: '20/03/2024',
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
        <Button className="bg-lime-600 hover:bg-lime-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm người dùng..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Lọc</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-lime-100"
                      >
                        <Edit className="w-4 h-4 text-lime-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Hiển thị {filteredUsers.length} trong tổng số {users.length} người
            dùng
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Trước
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 