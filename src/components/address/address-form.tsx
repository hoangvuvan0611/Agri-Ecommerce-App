'use client';

import { Address } from '@/types/address';
import { useState, useEffect } from 'react';
import { provinceService, districtService } from '@/services/admin';
import { City, District } from '@/types/admin';

interface AddressFormProps {
  initialData?: Address;
  onSubmit: (data: Address, addressType: string) => void;
  type: 'provinces' | 'districts' | 'wards';
}

export default function AddressForm({ initialData, onSubmit, type }: AddressFormProps) {
  const [formData, setFormData] = useState<Address>({
    name: initialData?.name || '',
    postalCode: initialData?.postalCode || '',
    status: initialData?.status || 'ACTIVE',
    cityId: initialData?.cityId,
    districtId: initialData?.districtId,
  });

  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (type === 'districts' || type === 'wards') {
          const provincesData = await provinceService.getAll();
          setCities(provincesData.data || []);
        }
        if (type === 'wards' && formData.cityId) {
          const districtsData = await districtService.getAll(formData.cityId);
          setDistricts(districtsData.data || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setCities([]);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [type, formData.cityId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, type);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tên
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
          required
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Mã
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
          required
        />
      </div>

      {type === 'districts' && (
        <div>
          <label htmlFor="provinceId" className="block text-sm font-medium text-gray-700">
            Tỉnh/Thành phố
          </label>
          <select
            id="cityId"
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
            required
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {type === 'wards' && (
        <>
          <div>
            <label htmlFor="provinceId" className="block text-sm font-medium text-gray-700">
              Tỉnh/Thành phố
            </label>
            <select
              id="cityId"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
              required
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="districtId" className="block text-sm font-medium text-gray-700">
              Quận/Huyện
            </label>
            <select
              id="districtId"
              name="districtId"
              value={formData.districtId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
              required
              disabled={!formData.cityId}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Trạng thái
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-2"
        >
          <option value="ACTIVE">Hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Lưu
        </button>
      </div>
    </form>
  );
} 