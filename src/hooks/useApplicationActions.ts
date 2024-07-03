import applicationAPI from '@/lib/api/applicationAPI';
import useApiRequestWithPopup from './useApiRequestWithPopup';

interface Params {
  shop_id: string;
  notice_id: string;
  application_id?: string;
}
type SuccessFunc<T> = (data: T) => void;
type FailedFunc = (error: Error) => void;

/**
 * api 액션을 수행하고 자동으로 popup을 띄워주는 훅입니다
 * @param successfulFunc 요청 성공시 실행할 함수 (data: unknown) => void;
 * @param failedFunc 요청 실패시 실행할 함수 (error: Error) => void;
 * @param params url 설정을 위한 id값을 담은 객체
 * @returns
 */
const useApplicationActions = <T>(
  params: Params,
  successfulFunc: SuccessFunc<T>,
  failedFunc?: FailedFunc
) => {
  const handleAsyncOperation = useApiRequestWithPopup<T>(
    successfulFunc,
    failedFunc
  );
  const { shop_id, notice_id, application_id } = params;

  const createApplication = (popupText?: string) => {
    handleAsyncOperation(
      applicationAPI.postShopApply({ shop_id, notice_id }),
      popupText
    );
  };

  const updateApplication = async (
    status: ApplicationStatus,
    popupText?: string
  ) => {
    if (!application_id) return;
    const url = `shops/${shop_id}/notices/${notice_id}/applications/${application_id}`;

    handleAsyncOperation(applicationAPI.putShopApply(url, status), popupText);
  };

  const cancelApplication = async (popupText?: string) => {
    updateApplication('canceled', popupText);
  };

  return { createApplication, updateApplication, cancelApplication };
};

export default useApplicationActions;
