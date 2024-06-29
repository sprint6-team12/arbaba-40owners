import { ShopLocation, ShopMenuCategory } from './ShopOption';

interface ShopBase {
  id: string;
  name: string;
  category: ShopMenuCategory;
  address1: ShopLocation;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface ShopEmployee extends ShopBase {}
export interface ShopEmployer extends ShopBase {
  user: UserData;
}

export type Shop = ShopEmployee | ShopEmployer;

export interface ShopData {
  item: Shop;
  href?: string;
}
