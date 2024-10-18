import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { SORT_OPTION_MAP } from '@/constants/sortOptionMap';
import { getNoticeList } from '@/lib/api/noticeAPI';

interface NoticeSettings {
  offset: number;
  limit: number;
  keyword: string;
  address: string[];
  startsAtGte: string;
  hourlyPayGte: string;
  sort: string;
}

function useNoticeList(initialData: NoticeListResponseData) {
  const [noticeData, setNoticeData] =
    useState<NoticeListResponseData>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSettings, setCurrentSettings] = useState<NoticeSettings>({
    offset: 0,
    limit: 6,
    keyword: initialData.keyword || '',
    address: [],
    startsAtGte: '',
    hourlyPayGte: '',
    sort: 'time',
  });

  const router = useRouter();

  const fetchNotices = useCallback(
    async (settings: NoticeSettings, page: number) => {
      const params = new URLSearchParams();
      Object.entries(settings).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value !== '') {
          params.append(key, value.toString());
        }
      });
      params.set('offset', ((page - 1) * settings.limit).toString());
      params.set('page', page.toString());
      if (settings.keyword) {
        params.set('keyword', settings.keyword);
      }

      const newNoticeData = await getNoticeList(params);
      setNoticeData(newNoticeData);
      setCurrentPage(page);

      router.push(
        { pathname: router.pathname, query: params.toString() },
        undefined,
        { shallow: true }
      );
      return newNoticeData;
    },
    []
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      await fetchNotices(currentSettings, page);
    },
    [currentSettings, fetchNotices]
  );

  const handleSortClick = useCallback(
    async (value: string) => {
      const sortValue =
        SORT_OPTION_MAP[value as keyof typeof SORT_OPTION_MAP] || 'time';
      const newSettings = {
        ...currentSettings,
        sort: sortValue,
      };
      setCurrentSettings(newSettings);
      await fetchNotices(newSettings, 1);
    },
    [currentSettings, fetchNotices]
  );

  const fetchFilterData = useCallback(
    async (params: URLSearchParams) => {
      const newAddresses = params.getAll('address');
      const newSettings = {
        ...currentSettings,
        address: newAddresses,
        startsAtGte: params.get('startsAtGte') || '',
        hourlyPayGte: params.get('hourlyPayGte') || '',
      };

      if (newAddresses.length === 0) {
        newSettings.address = [];
      }

      setCurrentSettings(newSettings);
      await fetchNotices(newSettings, 1);
    },
    [currentSettings, fetchNotices]
  );

  const handleSearch = useCallback(
    async (keyword: string) => {
      const newSettings = {
        ...currentSettings,
        keyword: keyword,
        offset: 0,
      };
      setCurrentSettings(newSettings);
      return await fetchNotices(newSettings, 1);
    },
    [currentSettings, fetchNotices]
  );

  return {
    noticeData,
    currentPage,
    currentSettings,
    setCurrentSettings,
    fetchNotices,
    handlePageChange,
    handleSortClick,
    fetchFilterData,
    handleSearch,
  };
}

export default useNoticeList;
