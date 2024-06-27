export interface MyPageProfileData {
  id: string;
  email: string;
  type: 'employee' | 'employer';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop: Shop;
}
