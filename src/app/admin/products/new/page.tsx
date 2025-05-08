'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { productService } from '@/services/admin';
import { Loader2 } from 'lucide-react';

export default function NewProductPage() {
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
    status: 'ACTIVE' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await productService.create({
        ...formData,
        originalPrice: Number(formData.originalPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        quantity: Number(formData.quantity),
      });
      toast.success('Thêm sản phẩm thành công');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Không thể thêm sản phẩm');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
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
              <Label htmlFor="images">Ảnh sản phẩm</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
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
                'Thêm sản phẩm'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 