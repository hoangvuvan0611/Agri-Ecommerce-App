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
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Rau cải xanh',
    category: 'Rau xanh',
    price: 25000,
    stock: 100,
    status: 'active',
  },
  {
    id: 2,
    name: 'Cà chua',
    category: 'Rau củ',
    price: 35000,
    stock: 50,
    status: 'active',
  },
  {
    id: 3,
    name: 'Dưa hấu',
    category: 'Trái cây',
    price: 15000,
    stock: 0,
    status: 'inactive',
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <Button className="bg-lime-600 hover:bg-lime-700">
          <Plus className="w-4 h-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
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
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                    </span>
                  </TableCell>
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
                        onClick={() => handleDelete(product.id)}
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
            Hiển thị {filteredProducts.length} trong tổng số {products.length} sản
            phẩm
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