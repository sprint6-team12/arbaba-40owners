import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/FormGroup/FormGroup';
import ConfirmModal from '@/components/pageComponents/AddShopPage/ConfirmModal';
import useModal from '@/hooks/useModal';
import noticeAPI, { ShopNoticeData } from '@/lib/api/noticeAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import {
  clearError,
  hasErrors,
  handleInputChange,
} from '@/lib/utils/FormUtils';
import { validateAddNoticeForm } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';

export interface ShopNoticeFormErrors {
  hourlyPay: string | null;
  startsAt: string | null;
  workhour: string | null;
  description: string | null;
}
const currentDateTime = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .slice(0, 16);

const initialFormData: ShopNoticeData = {
  hourlyPay: 0,
  startsAt: currentDateTime,
  workhour: 0,
  description: '',
};

const initialFormErrors: ShopNoticeFormErrors = {
  hourlyPay: null,
  startsAt: null,
  workhour: null,
  description: null,
};

export default function AddNoticeInput() {
  const { shopId } = useRecoilValue(userState);
  const { openModal } = useModal();
  const [data, setData] = useState<ShopNoticeData>(initialFormData);
  const [errors, setErrors] = useState<ShopNoticeFormErrors>(initialFormErrors);
  const router = useRouter();

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'hourlyPay') {
      const numericValue = parseInt(value.replace(/,/g, ''), 10) || 0;
      handleInputChange(setData, name, numericValue);
    } else {
      handleInputChange(setData, name, value);
    }
    clearError(setErrors, name as keyof ShopNoticeFormErrors);
  };

  const handleOpenConfirmModal = (content: string) => {
    openModal('addNoticeConfirmModal', ConfirmModal, {
      content: content,
      onConfirm: () => {
        router.push(`/shops/${shopId}`);
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateAddNoticeForm(data);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
    } else {
      try {
        if (typeof shopId === 'string') {
          const formattedStartsAt = new Date(data.startsAt).toISOString();
          await noticeAPI.postShopNotice(shopId, {
            hourlyPay: data.hourlyPay,
            startsAt: formattedStartsAt,
            workhour: Number(data.workhour),
            description: data.description,
          });
          handleOpenConfirmModal('등록이 완료되었습니다.');
          router.push(`/shops/${shopId}`);
        } else {
          handleOpenConfirmModal('유효하지 않은 ID입니다.');
        }
      } catch (error) {
        handleOpenConfirmModal(
          '등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
        router.push('/');
      }
    }
  };

  return (
    <div className="flex-center">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="tablet:flex tablet:justify-between tablet:gap-20px pc:flex pc:gap-20px">
          <div className="pc:flex pc:justify-between pc:basis-2/3 gap-20px w-full">
            <div className="mb-20px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="hourlyPay">시급*</FormGroup.Label>
                <FormGroup.InputWrapper className="flex input-base">
                  <FormGroup.InputField
                    name="hourlyPay"
                    type="text"
                    value={
                      data.hourlyPay === 0
                        ? ''
                        : FormatUtils.price(data.hourlyPay)
                    }
                    onChange={handleChangeData}
                  />
                  <span>원</span>
                </FormGroup.InputWrapper>
                <FormGroup.ErrorMessage errorMessage={errors.hourlyPay} />
              </FormGroup>
            </div>
            <div className="mb-60px h-58px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="startsAt">시작 일시*</FormGroup.Label>
                <FormGroup.InputField
                  id="startsAt"
                  name="startsAt"
                  type="datetime-local"
                  value={data.startsAt}
                  min={currentDateTime}
                  onChange={handleChangeData}
                  className="input-base"
                />
                <FormGroup.ErrorMessage errorMessage={errors.startsAt} />
              </FormGroup>
            </div>
          </div>
          <div className="mb-20px w-full pc:basis-1/3">
            <FormGroup>
              <FormGroup.Label htmlFor="workhour">업무 시간*</FormGroup.Label>
              <FormGroup.InputWrapper className="flex input-base">
                <FormGroup.InputField
                  id="workhour"
                  name="workhour"
                  type="number"
                  value={data.workhour === 0 ? '' : data.workhour}
                  onChange={handleChangeData}
                />
                <span className="w-40px">시간</span>
              </FormGroup.InputWrapper>
              <FormGroup.ErrorMessage errorMessage={errors.workhour} />
            </FormGroup>
          </div>
        </div>
        <FormGroup>
          <FormGroup.Label htmlFor="description">공고 설명</FormGroup.Label>
          <FormGroup.InputField.Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChangeData}
            placeholder="공고 설명을 입력하세요"
            className="h-153px"
          />
        </FormGroup>

        <div className="mt-24px text-center">
          <Button className="button_large_active" type="submit">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
