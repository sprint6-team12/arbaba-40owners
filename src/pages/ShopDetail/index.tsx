import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '@/components/Post/Post';
import ShopNoData from '@/components/ShopDetail/ShopNoData';
import ShopTitle from '@/components/ShopDetail/ShopTitle/ShopTitle';
import { Notices, Shops } from '@/types/ShopDetail';

export default function ShopDetail() {
  const [shopData, setShopData] = useState<Shops | null>(null);
  const [noticesData, setNoticesData] = useState<Notices | null>(null);
  const shopId = '7367ccac-bcce-4203-9bb9-65098fffb05e'; // 실제론 로컬스토리지나 recoil에 저장된 userId값으로 내정보조회 api 돌려서 shopId 얻어내야됨 아니면 얘도 전역관리?

  const axiosInstance = axios.create({
    baseURL: 'https://bootcamp-api.codeit.kr/api/6-12/the-julge',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });

  const getNotices = async () => {
    try {
      const res = await axiosInstance.get(`/shops/${shopId}/notices`);
      setNoticesData(res.data);
    } catch (error) {
      setShopData(null);
    }
  };

  const getShop = async () => {
    try {
      const res = await axiosInstance.get(`/shops/${shopId}`);
      setShopData(res.data.item);
    } catch (error) {
      setShopData(null);
    }
  };

  useEffect(() => {
    getShop();
    getNotices();
  }, [shopId]);

  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto w-full my-20px px-32px py-60px max-w-[1000px]">
        <h1 className="font-bold text-start text-28px mb-24px">내 가게</h1>
        {!shopData ? (
          <ShopNoData
            title="내 가게를 소개하고 공고도 등록해 보세요."
            text="내 가게 등록하기"
          />
        ) : (
          <div className="flex flex-col items-start justify-start gap-0 p-24px rounded-24px bg-red10 min-h-[358px] pc:flex-row pc:gap-31px">
            <ShopTitle shopData={shopData} />
          </div>
        )}
      </div>
      {shopData && (
        <div className="bg-[#fafafa]">
          <div className="mx-auto w-full px-32px py-60px max-w-[1000px]">
            <h1 className="font-bold text-start text-28px mb-24px pt-40px">
              등록한 공고
            </h1>
            {!noticesData ? (
              <ShopNoData title="공고를 등록해보세요." text="공고 등록하기" />
            ) : (
              <div className="flex gap-32px">
                <div className="grid grid-cols-2 gap-x-8px gap-y-12px my-0 mx-auto pc:gap-x-36px pc:gap-y-26px pc:grid-cols-3">
                  {noticesData.items.map((item) => (
                    <Post
                      key={item.item.id}
                      hourlyPay={item.item.hourlyPay}
                      startsAt={item.item.startsAt}
                      closed={item.item.closed}
                      workhour={item.item.workhour}
                      name={shopData.name}
                      address1={shopData.address1}
                      imageUrl={shopData.imageUrl}
                      originalHourlyPay={shopData.originalHourlyPay}
                      href={item.item.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
