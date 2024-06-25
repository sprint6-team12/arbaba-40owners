import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Shop } from '@/types/ShopDetail';
import DetailShop from './DetailShop';
import RegisterShop from './RegisterShop';

export default function Shop({ shopId }: { shopId: string }) {
  const [shopData, setShopData] = useState<Shop | null>(null);

  const axiosInstance = axios.create({
    baseURL: 'https://bootcamp-api.codeit.kr/api/6-12/the-julge',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });

  useEffect(() => {
    const getShop = async () => {
      try {
        const res = await axiosInstance.get(`/shops/${shopId}`);
        setShopData(res.data.item);
      } catch (error) {
        setShopData(null);
      }
    };
    getShop();
  }, [shopId]);

  return (
    <div className="w-full p-60px flex">
      <div className="mx-auto w-full">
        <h1 className="font-bold text-start text-28px mb-24px">내 가게</h1>
        {!shopData ? <RegisterShop /> : <DetailShop shopData={shopData} />}
      </div>
    </div>
  );
}
