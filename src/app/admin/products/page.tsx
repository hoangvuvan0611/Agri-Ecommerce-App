'use client';

import { useState, useEffect } from 'react';
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
import { Plus, Search, Edit, Trash2, ArrowUpDown, Loader2 } from 'lucide-react';
import { categoryService, productService } from '@/services/admin';
import { Category, Product } from '@/types/admin';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';
import { u } from 'framer-motion/client';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    console.log('Selected category:', selectedCategory);
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Không thể tải danh mục sản phẩm. Vui lòng thử lại sau.');
      toast.error('Không thể tải danh mục sản phẩm');
    }
  };  

  // Tai danh sach san pham
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getManageProducts();
      setProducts(data);
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      toast.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        setIsDeleting(id);
        await productService.delete(id);
        setProducts(products.filter(product => product.id !== id));
        toast.success('Xóa sản phẩm thành công');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Không thể xóa sản phẩm');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleStatusChange = async (id: number, currentStatus: string) => {
    try {
      setIsUpdatingStatus(id);
      const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await productService.updateStatus(id, newStatus);
      setProducts(products.map(product => 
        product.id === id ? { ...product, status: newStatus } : product
      ));
      toast.success('Cập nhật trạng thái thành công');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Không thể cập nhật trạng thái');
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <Card className="p-4">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <Button onClick={() => router.push('/admin/products/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>
        <Card className="p-4">
          <div className="text-center text-red-500">{error}</div>
          <div className="flex justify-center mt-4">
            <Button onClick={loadProducts}>Thử lại</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button onClick={() => router.push('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn danh mục">
                  {
                    selectedCategory === '0'
                      ? 'Tất cả danh mục'
                      : categories?.find(c => c.id === selectedCategory)?.name ?? ''
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tất cả danh mục {categories.length}</SelectItem>
                {categories?.map((category, index) => (
                  <SelectItem key={index} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ảnh</TableHead>
              <TableHead 
                className="cursor-pointer" 
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Tên sản phẩm
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead 
                className="cursor-pointer" 
                onClick={() => handleSort('originalPrice')}
              >
                <div className="flex items-center">
                  Giá
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer" 
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center">
                  Tồn kho
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Không tìm thấy sản phẩm nào
                </TableCell>
              </TableRow>
            ) : (
              products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className='p-0'>
                    <div className="w-24 h-24 relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
                        alt={product.name}
                        unoptimized
                        fill
                        quality={100}
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.originalPrice.toLocaleString('vi-VN')}đ</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(product.id, product.status)}
                      disabled={isUpdatingStatus === product.id}
                    >
                      {isUpdatingStatus === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'ACTIVE' ? 'Đang bán' : 'Ngừng bán'}
                        </span>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/products/${product.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting === product.id}
                    >
                      {isDeleting === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <span className="flex items-center px-4">
                Trang {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau
              </Button>
            </div>
          </div>
        )} */}
      </Card>
    </div>
  );
} 