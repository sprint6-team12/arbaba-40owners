import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import keywordDataState from '@/recoil/atoms/searchAtom';
import searchResultState from '@/recoil/atoms/SearchResultAtom';

export function useResetSearchOnHome(initialData: NoticeListResponseData) {
  const setKeyword = useSetRecoilState(keywordDataState);
  const setSearchResult = useSetRecoilState(searchResultState);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/') {
        setKeyword('');
        setSearchResult(initialData);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, setKeyword, setSearchResult, initialData]);
}
