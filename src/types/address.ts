export interface Address {
  id?: string;
  name: string;
  postalCode: string;
  status: 'ACTIVE' | 'INACTIVE';
  cityId?: string;
  districtId?: string;
  createdAt?: string;
  updatedAt?: string;
} 