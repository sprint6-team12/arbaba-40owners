import fetchInstance from './fetchInstance';

interface ShopApplyData {
  shop_id: string;
  notice_id: string;
  application_id?: string;
  offset?: number;
  limit?: number;
}

interface UserApplyData {
  user_id: string;
  offset: number;
  limit: number;
}

export async function getShopApply({
  shop_id,
  notice_id,
  offset,
  limit,
}: ShopApplyData) {
  const params = {
    offset,
    limit,
  };
  const response = await fetchInstance.get(
    `/shops/${shop_id}/notices/${notice_id}/applications`,
    { params }
  );
  return response;
}

export async function postShopApply({ shop_id, notice_id }: ShopApplyData) {
  const response = await fetchInstance.post(
    `/shops/${shop_id}/notices/${notice_id}/applications`,
    {}
  );
  return response;
}

export async function putShopApply(href: string, applyStatus: string) {
  const response = await fetchInstance.put(href, { status: applyStatus });
  return response;
}

export async function getUserApply({ user_id, offset, limit }: UserApplyData) {
  const params = {
    user_id,
    offset,
    limit,
  };
  const response = await fetchInstance.get(`/users/${user_id}/applications`, {
    params,
  });
  return response;
}
