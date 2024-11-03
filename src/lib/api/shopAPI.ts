import { User } from '@/recoil/atoms/AuthAtom';
import fetchInstance from './fetchInstance';

interface PostShopData {
  name?: string;
  category?: string;
  address1?: string;
  address2?: string;
  description?: string;
  imageUrl?: string;
  originalHourlyPay?: number;
}

export async function getShop(shop_id: string) {
  const response = await fetchInstance.get(`/shops/${shop_id}`);
  return response;
}

export async function postShop(
  body: PostShopData,
  setAuthState: (update: (prevState: User) => User) => void
) {
  const response = await fetchInstance.post(`/shops`, body);

  const shopId = response?.item?.id;
  const address = response?.item?.address1;
  const DetailAddress = response?.item?.address2;
  setAuthState((prevState: User) => ({
    ...prevState,
    shopId: shopId,
    isLogin: true,
    address: address,
    DetailAddress: DetailAddress,
  }));
  return response;
}

export async function putShop(shop_id: string, body: PostShopData) {
  const response = await fetchInstance.put(`/shops/${shop_id}`, body);
  return response;
}
