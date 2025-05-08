'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { productService } from '@/services/admin';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    salePrice: '',
    quantity: '',
    category: '',
    images: [] as string[],
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await productService.getById(Number(params.id));
      debugger
      setFormData({
        name: product.name,
        description: product.description,
        originalPrice: product.originalPrice.toString(),
        salePrice: product.salePrice?.toString() || '',
        quantity: product.quantity.toString(),
        category: product.category,
        images: product.images,
        status: product.status,
      });
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Không thể tải thông tin sản phẩm');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await productService.update(Number(params.id), {
        ...formData,
        originalPrice: Number(formData.originalPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        quantity: Number(formData.quantity),
      });
      toast.success('Cập nhật sản phẩm thành công');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Không thể cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setLoading(true);
      // TODO: Implement image upload logic here
      // For now, we'll just use placeholder URLs
      const imageUrls = Array.from(files).map(() => '/placeholder.png');
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Không thể tải lên ảnh');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (loading && !formData.name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Quay lại
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Giá gốc</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Giá khuyến mãi (tùy chọn)</Label>
              <Input
                id="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Số lượng</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'ACTIVE' | 'INACTIVE') =>
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Đang bán</SelectItem>
                  <SelectItem value="INACTIVE">Ngừng bán</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả sản phẩm</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Ảnh sản phẩm</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData?.images?.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4"
            />
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Cập nhật sản phẩm'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 