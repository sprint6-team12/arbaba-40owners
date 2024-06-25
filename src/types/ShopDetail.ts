const SHOP_CATEGORY = {
  Korean: '한식',
  Chinese: '중식',
  Japanese: '일식',
  Western: '양식',
  SnackBar: '분식',
  Cafe: '카페',
  Convenience: '편의점',
  Other: '기타',
} as const;
type ShopCategory = (typeof SHOP_CATEGORY)[keyof typeof SHOP_CATEGORY];

export interface Shops {
  id: string;
  name: string;
  category: ShopCategory;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: {
    item: {
      id: string;
      email: string;
      type: string;
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
}

export interface Notices {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Item3[];
  links: Link[];
}

interface Item3 {
  item: Item2;
  links: Link[];
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}

interface Item2 {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
}

interface Shop {
  item: Item;
  href: string;
}

interface Item {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}
