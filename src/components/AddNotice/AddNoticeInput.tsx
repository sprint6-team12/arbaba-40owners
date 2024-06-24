import { useState, FormEvent } from 'react';
import FormGroup from '../FormGroup/FormGroup';
import Button from '../Button/Button';

export default function AddNoticeInput() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});

  const handleData = (event: any) => {
    if (event.type === 'click') {
      const target = event.target as HTMLButtonElement;
      setData((prev) => ({
        ...prev,
        [target.name]: target.textContent,
      }));
    } else if (event.type === 'change') {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormGroup className="w-308px">
          <FormGroup.Label htmlFor="hourlyPay">시급*</FormGroup.Label>
          <FormGroup.InputWrapper className="flex input-base">
            <FormGroup.InputField
              id="hourlyPay"
              name="hourlyPay"
              type="number"
              onChange={handleData}
              placeholder="입력"
            />
            <span>원</span>
          </FormGroup.InputWrapper>

          <FormGroup.Label htmlFor="startsAt">시간*</FormGroup.Label>
          <FormGroup.InputField.Text
            id="startsAt"
            name="startsAt"
            className="h-48px"
            onChange={handleData}
            placeholder="입력"
          />

          <FormGroup.Label htmlFor="workHour">업무 시간*</FormGroup.Label>
          <FormGroup.InputWrapper className="flex input-base">
            <FormGroup.InputField
              id="workHour"
              name="workhour"
              onChange={handleData}
              placeholder="입력"
            />
            <span className="w-40px">시간</span>
          </FormGroup.InputWrapper>

          <FormGroup.Label htmlFor="description">공고 설명</FormGroup.Label>
          <FormGroup.InputField.Textarea
            id="description"
            name="description"
            onChange={handleData}
            placeholder="공고 설명을 입력해주세요"
          />
        </FormGroup>

        <Button type="submit" className="w-full button_medium_active">
          등록하기
        </Button>
      </form>
    </div>
  );
}
