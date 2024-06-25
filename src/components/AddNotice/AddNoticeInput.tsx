import { useState } from 'react';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalPrimary from '@/components/Modal/ModalPrimary';
import useModal from '@/hooks/useModal';
import FormatUtils from '@/lib/utils/FormatUtils';
import { AddNoticeValidation } from '@/lib/utils/InputValidation';

export interface FormData {
  hourlyPay: string;
  startsAt: string;
  workHour: number;
  description: string;
}

export interface FormErrors {
  hourlyPay: string | null;
  startsAt: string | null;
  workHour: string | null;
}

export default function AddNoticeInput() {
  const { openModal } = useModal();
  const [data, setData] = useState<FormData>({
    hourlyPay: '',
    startsAt: '',
    workHour: 0,
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    hourlyPay: null,
    startsAt: null,
    workHour: null,
  });

  const handleData = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if (name === 'hourlyPay') {
      const formattedPrice = FormatUtils.price(Number(value.replace(/,/g, '')));
      setData((prev) => ({
        ...prev,
        [name]: formattedPrice,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const ConfirmModal = ({ ...rest }) => (
    <ModalPrimary
      optionType="confirm"
      content="등록이 완료되었습니다."
      {...rest}
    />
  );

  const handleOpenConfirmModal = () => {
    openModal('confirmModal', ConfirmModal, {
      // onConfirm: () => console.log(data),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = AddNoticeValidation(data);
    if (Object.values(validationErrors).some((error) => error !== null)) {
      setErrors(validationErrors);
    } else {
      // 유효성 검사를 통과한 경우, 확인 모달을 엽니다
      handleOpenConfirmModal();
    }
  };

  return (
    <div className="flex-center">
      <form onSubmit={handleSubmit} className="w-full">
        <FormGroup>
          <div className="tablet:flex tablet:justify-between tablet:gap-20px pc:flex pc:gap-20px">
            <div className="pc:flex pc:justify-between pc:basis-2/3 gap-20px w-full">
              <div className="mb-20px w-full">
                <FormGroup.Label htmlFor="hourlyPay">시급*</FormGroup.Label>
                <FormGroup.InputWrapper className="flex input-base">
                  <FormGroup.InputField
                    id="hourlyPay"
                    name="hourlyPay"
                    type="text"
                    value={data.hourlyPay}
                    onChange={handleData}
                  />
                  <span>원</span>
                </FormGroup.InputWrapper>
                <FormGroup.ErrorMessage errorMessage={errors.hourlyPay} />
              </div>
              <div className="mb-60px h-58px w-full">
                <FormGroup.Label htmlFor="startsAt">시작 일시*</FormGroup.Label>
                <FormGroup.InputField
                  id="startsAt"
                  name="startsAt"
                  type="datetime-local"
                  onChange={handleData}
                  className="input-base"
                />
                <FormGroup.ErrorMessage errorMessage={errors.startsAt} />
              </div>
            </div>
            <div className="mb-20px w-full pc:basis-1/3">
              <FormGroup.Label htmlFor="workHour">업무 시간*</FormGroup.Label>
              <FormGroup.InputWrapper className="flex input-base">
                <FormGroup.InputField
                  id="workHour"
                  name="workHour"
                  type="number"
                  value={data.workHour}
                  onChange={handleData}
                />
                <span className="w-40px">시간</span>
              </FormGroup.InputWrapper>
              <FormGroup.ErrorMessage errorMessage={errors.workHour} />
            </div>
          </div>
          <FormGroup.Label htmlFor="description">공고 설명</FormGroup.Label>
          <FormGroup.InputField.Textarea
            id="description"
            name="description"
            onChange={handleData}
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