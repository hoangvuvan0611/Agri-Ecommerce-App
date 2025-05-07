'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Address } from '@/types/address';
import { toast } from 'sonner';
import AddressForm from '@/components/address/address-form';
import { use } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface AddressPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default function AddressPage({ params }: AddressPageProps) {
  const router = useRouter();
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const { type, id } = use(params);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`/api/addresses/${type}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }
        const data = await response.json();
        console.log(data)
        setAddress(data);
      } catch (error) {
        console.error('Error fetching address:', error);
        toast.error('Không thể tải địa chỉ');
      } finally {
        setLoading(false);
      }
    };

    if (id !== 'new') {
      fetchAddress();
    } else {
      setLoading(false);
    }
  }, [id, type]);

  const handleSubmit = async (data: Address, addressType: string) => {
    try {
      let url = undefined;
      if (addressType === 'provinces') {
        url = id === 'new'
        ? `/api/v1/city/create`
        : `/api/v1/city/update/${id}`;
      } else if (addressType === 'districts') {
        url = id === 'new'
        ? `/api/v1/district/create`
        : `/api/v1/district/update/${id}`;
      } else {
        url = id === 'new'
        ? `/api/v1/ward/create`
        : `/api/addresses/${addressType}/${id}`;
      }
      debugger
      const response = id === 'new' 
        ? await axiosInstance.post(url, data)
        : await axiosInstance.put(url, data);

      if (!response) {
        throw new Error('Failed to save address');
      }

      toast.success('Lưu địa chỉ thành công');
      router.push('/admin/addresses');
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Không thể lưu địa chỉ');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {id === 'new' ? 'Thêm địa chỉ mới' : 'Chỉnh sửa địa chỉ'}
      </h1>
      <AddressForm
        initialData={address || undefined}
        onSubmit={handleSubmit}
        type={type as 'provinces' | 'districts' | 'wards'}
      />
    </div>
  );
} 