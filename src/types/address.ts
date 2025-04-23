export interface Address {
  id?: number;
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE';
  provinceId?: number;
  districtId?: number;
  createdAt?: string;
  updatedAt?: string;
} 