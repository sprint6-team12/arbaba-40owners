import { useState, FormEvent } from 'react';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';

interface FormData {
  hourlyPay: string;
  startsAt: string;
  workHour: string;
  description: string;
}

interface FormErrors {
  hourlyPay: string | null;
  startsAt: string | null;
  workHour: string | null;
}

export default function AddNoticeInput() {
  const [data, setData] = useState<FormData>({
    hourlyPay: '',
    startsAt: '',
    workHour: '',
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

    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [target.name]: null,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {
      hourlyPay: null,
      startsAt: null,
      workHour: null,
    };

    if (!data.hourlyPay) {
      newErrors.hourlyPay = '시급을 입력해주세요.';
    }
    if (!data.startsAt) {
      newErrors.startsAt = '시작 일시를 입력해주세요.';
    }
    if (!data.workHour) {
      newErrors.workHour = '시간을 입력해주세요.';
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some((error) => error !== null)) {
      setErrors(validationErrors);
    } else {
      // 유효성 검사를 통과한 경우, 데이터 제출
    }
  };

  return (
    <div className="flex-center tablet:w-680px pc:w-964px">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <div className="tablet:flex tablet:flex-wrap tablet:gap-20px pc:flex pc:gap-20px">
            <div className="pc:flex gap-20px">
              <div className="mb-20px">
                <FormGroup.Label htmlFor="hourlyPay">시급*</FormGroup.Label>
                <FormGroup.InputWrapper className="flex input-base">
                  <FormGroup.InputField
                    id="hourlyPay"
                    name="hourlyPay"
                    type="number"
                    onChange={handleData}
                  />
                  <span>원</span>
                </FormGroup.InputWrapper>
                <FormGroup.ErrorMessage errorMessage={errors.hourlyPay} />
              </div>
              <div className="mb-40px h-58px">
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
            <div className="mb-20px">
              <FormGroup.Label htmlFor="workHour">업무 시간*</FormGroup.Label>
              <FormGroup.InputWrapper className="flex input-base">
                <FormGroup.InputField
                  id="workHour"
                  name="workHour"
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
          <Button type="submit" className="button_large_active">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
