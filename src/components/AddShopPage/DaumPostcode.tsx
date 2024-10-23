import Script from 'next/script';
import { useEffect, useRef } from 'react';

interface DaumPostcodeData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
  zonecode: string;
  roadAddress: string;
  roadname: string;
  jibunAddress: string;
  sido: string;
  sigungu: string;
  userSelectedType: 'R' | 'J';
}

interface DaumPostcodeProps {
  onComplete: (data: DaumPostcodeData) => void;
  onClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
  onclose?: () => void;
  width: string | number;
  height: string | number;
  embed?: boolean;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: DaumPostcodeOptions) => void;
        onclose?: () => void;
        width?: string | number;
        height?: string | number;
        embed?: boolean;
      }) => {
        embed: (container: HTMLElement) => void;
      };
    };
  }
}

const DaumPostcode = ({ onComplete }: DaumPostcodeProps) => {
  const postcodeRef = useRef<any>(null);
  const loadingRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  const checkDaumPostcodeLoaded = () => {
    return typeof window !== 'undefined' && window.daum && window.daum.Postcode;
  };

  const initPostcode = () => {
    if (loadingRef.current || postcodeRef.current || !containerRef.current)
      return;
    if (!checkDaumPostcodeLoaded()) return;

    loadingRef.current = true;
    try {
      postcodeRef.current = new window.daum.Postcode({
        oncomplete: (data: any) => {
          onComplete(data);
        },
        onclose: () => {
          postcodeRef.current = null;
          loadingRef.current = false;
        },
        width: '100%',
        height: '100%',
        embed: true,
      });

      postcodeRef.current.embed(containerRef.current);
    } catch (error) {
      loadingRef.current = false;
    }
  };

  const handleScriptLoad = () => {
    scriptLoadedRef.current = true;
    // 약간의 지연을 주어 daum 객체가 완전히 초기화되도록 함
    setTimeout(() => {
      if (checkDaumPostcodeLoaded()) {
        initPostcode();
      }
    }, 100);
  };

  useEffect(() => {
    const checkExistingScript = () => {
      if (checkDaumPostcodeLoaded()) {
        scriptLoadedRef.current = true;
        initPostcode();
      }
    };

    checkExistingScript();

    return () => {
      postcodeRef.current = null;
      loadingRef.current = false;
      scriptLoadedRef.current = false;
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-[100vw] h-[100vh] tablet:w-400px tablet:h-[500px] pc:w-400px pc:h-[500px]"
      />

      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </>
  );
};

export default DaumPostcode;
