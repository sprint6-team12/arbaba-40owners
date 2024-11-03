import fetchInstance from './fetchInstance';

interface GetNoticeListData {
  offset?: number;
  limit?: number;
  address?: string | null;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: string;
}

interface GetShopNoticeListData {
  shop_id: string;
  offset: number;
  limit: number;
}

export interface GetShopNoticeData {
  shop_id: string;
  notice_id: string;
}

export interface ShopNoticeData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description?: string;
}

export async function getNoticeList(
  params: GetNoticeListData | URLSearchParams
) {
  const config = {
    params: params,
  };
  const response = await fetchInstance.get(`/notices`, config);
  return response;
}

export async function getShopNoticeList(
  shop_id: string,
  params: GetShopNoticeListData
) {
  const response = await fetchInstance.get(`/shops/${shop_id}/notices`, {
    params,
  });
  return response;
}

export async function getShopNotice({ shop_id, notice_id }: GetShopNoticeData) {
  const response = await fetchInstance.get(
    `/shops/${shop_id}/notices/${notice_id}`
  );
  return response;
}

export async function postShopNotice(shop_id: string, body: ShopNoticeData) {
  const response = await fetchInstance.post(`/shops/${shop_id}/notices`, body);
  return response;
}

export async function putShopNotice(
  shop_id: string,
  notice_id: string,
  body: ShopNoticeData
) {
  const response = await fetchInstance.put(
    `/shops/${shop_id}/notices/${notice_id}`,
    body
  );
  return response;
}
