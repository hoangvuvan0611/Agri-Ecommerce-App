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
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { provinceService, districtService, wardService } from '@/services/admin';
import { City, District, Ward } from '@/types/admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AddressesPage() {
  const [activeTab, setActiveTab] = useState<'provinces' | 'districts' | 'wards'>('provinces');
  const [searchTerm, setSearchTerm] = useState('');
  const [provinces, setProvinces] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      switch (activeTab) {
        case 'provinces':
          const provincesData = await provinceService.getAll();
          setProvinces(provincesData.data);
          break;
        case 'districts':
          const districtsData = await districtService.getAll();
          setDistricts(districtsData.data);
          break;
        case 'wards':
          const wardsData = await wardService.getAll();
          setWards(wardsData);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case 'provinces':
          await provinceService.delete(id);
          setProvinces(provinces.filter(p => p.id !== id));
          break;
        case 'districts':
          await districtService.delete(id);
          setDistricts(districts.filter(d => d.id !== id));
          break;
        case 'wards':
          await wardService.delete(id);
          setWards(wards.filter(w => w.id !== id));
          break;
      }
      toast.success('Xóa thành công');
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Không thể xóa');
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/addresses/${activeTab}/${id}`);
  };

  const handleAdd = () => {
    router.push(`/admin/addresses/${activeTab}/new`);
  };

  const filteredData = () => {
    switch (activeTab) {
      case 'provinces':
        return provinces.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'districts':
        return districts.filter(d => 
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'wards':
        return wards.filter(w => 
          w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý địa chỉ</h1>
        <Button onClick={handleAdd} className="bg-lime-600 hover:bg-lime-700">
          <Plus className="w-4 h-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === 'provinces' ? 'default' : 'outline'}
          onClick={() => setActiveTab('provinces')}
        >
          Tỉnh/Thành phố
        </Button>
        <Button
          variant={activeTab === 'districts' ? 'default' : 'outline'}
          onClick={() => setActiveTab('districts')}
        >
          Quận/Huyện
        </Button>
        <Button
          variant={activeTab === 'wards' ? 'default' : 'outline'}
          onClick={() => setActiveTab('wards')}
        >
          Xã/Phường
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>Tên</TableHead>
                {activeTab === 'districts' && <TableHead>Tỉnh/Thành phố</TableHead>}
                {activeTab === 'wards' && <TableHead>Quận/Huyện</TableHead>}
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredData().length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filteredData().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    {activeTab === 'districts' && (
                      <TableCell>
                        {(item as District).city}
                      </TableCell>
                    )}
                    {activeTab === 'wards' && (
                      <TableCell>
                        {districts.find(d => d.id === (item as Ward).districtId)?.name}
                      </TableCell>
                    )}
                    <TableCell>
                      <span className={`py-1 rounded-full text-sm`}>
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`py-1 rounded-full text-sm`}>
                        {new Date(item.updatedAt).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit className="w-4 h-4 text-lime-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 