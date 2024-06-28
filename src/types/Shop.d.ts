interface ShopBase {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface Shop extends ShopBase {}

interface ShopEmployee extends ShopBase {}
interface ShopEmployer extends ShopBase {
  user: unknown;
}

interface ShopData {
  item: ShopBase;
  href: string;
}
