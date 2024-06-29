export const SHOP_MENU_CATEGORY = {
  Korean: '한식',
  Chinese: '중식',
  Japanese: '일식',
  Western: '양식',
  SnackBar: '분식',
  Cafe: '카페',
  Convenience: '편의점',
  Other: '기타',
} as const;

export type ShopMenuCategory =
  (typeof SHOP_MENU_CATEGORY)[keyof typeof SHOP_MENU_CATEGORY];

export const SHOP_MENU_CATEGORY_ARRAY: ShopMenuCategory[] =
  Object.values(SHOP_MENU_CATEGORY);

export const SHOP_LOCATIONS = {
  강남구: '서울시 강남구',
  중구: '서울시 중구',
  용산구: '서울시 용산구',
  성동구: '서울시 성동구',
  광진구: '서울시 광진구',
  동대문구: '서울시 동대문구',
  중랑구: '서울시 중랑구',
  성북구: '서울시 성북구',
  강북구: '서울시 강북구',
  도봉구: '서울시 도봉구',
  노원구: '서울시 노원구',
  은평구: '서울시 은평구',
  서대문구: '서울시 서대문구',
  마포구: '서울시 마포구',
  양천구: '서울시 양천구',
  강서구: '서울시 강서구',
  구로구: '서울시 구로구',
  금천구: '서울시 금천구',
  영등포구: '서울시 영등포구',
  동작구: '서울시 동작구',
  관악구: '서울시 관악구',
  서초구: '서울시 서초구',
  송파구: '서울시 송파구',
  강동구: '서울시 강동구',
} as const;

export type ShopLocation = (typeof SHOP_LOCATIONS)[keyof typeof SHOP_LOCATIONS];

export const SHOP_LOCATIONS_ARRAY: ShopLocation[] =
  Object.values(SHOP_LOCATIONS);
