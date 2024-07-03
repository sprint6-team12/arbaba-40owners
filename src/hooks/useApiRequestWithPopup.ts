import usePopup from '@/hooks/usePopup';

type SuccessFunc<T> = (data: T) => void;
type FailedFunc = (error: Error) => void;

/**
 * api 액션을 수행하고 자동으로 popup을 띄워주는 훅입니다
 * @param successfulFunc 요청 성공시 실행할 함수 (data: unknown) => void;
 * @param failedFunc 요청 실패시 실행할 함수 (error: Error) => void;
 * @returns
 */
const useApiRequestWithPopup = <T>(
  successfulFunc: SuccessFunc<T>,
  failedFunc?: FailedFunc
) => {
  const { openPopup } = usePopup();

  const handleSuccessfulRequest = (data: T, popupText?: string) => {
    const message = popupText ? popupText : '완료';
    successfulFunc(data);
    openPopup('요청완료팝업', message, 3000);
  };

  const handleFailedRequest = (error: Error) => {
    if (failedFunc) failedFunc(error);
    const message = error.message || '실패했어요';
    openPopup('요청실패팝업', message, 3000);
  };

  const handleAsyncOperation = async (
    operation: Promise<T>,
    popupText?: string
  ) => {
    try {
      const data = await operation;
      if (!data) return;
      handleSuccessfulRequest(data, popupText);
    } catch (error) {
      handleFailedRequest(error as Error);
    }
  };

  return handleAsyncOperation;
};

export default useApiRequestWithPopup;
