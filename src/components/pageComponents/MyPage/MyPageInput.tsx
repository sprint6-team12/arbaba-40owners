import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalPrimary from '@/components/Modal/ModalPrimary';
import { LOCATIONS } from '@/constants/DataLocations';
import useModal from '@/hooks/useModal';
import FormatUtils from '@/lib/utils/FormatUtils';
import { validateMyPageForm } from '@/lib/utils/InputValidation';
import { MyPageFormData, MyPageFormErrors } from '@/types/FormData';

const initialFormData: MyPageFormData = {
  name: '',
  phone: '',
  address: '',
  bio: '',
};

const initialFormErrors: MyPageFormErrors = {
  name: null,
  phone: null,
  address: null,
  bio: null,
};

const ConfirmModal = ({ ...rest }) => (
  <ModalPrimary
    optionType="confirm"
    content="등록이 완료되었습니다."
    {...rest}
  />
);

export default function MyPageInput() {
  const { openModal } = useModal();
  const [data, setData] = useState<MyPageFormData>(initialFormData);
  const [errors, setErrors] = useState<MyPageFormErrors>(initialFormErrors);

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if (name === 'phone') {
      const cleanedValue = value.replace(/\D/g, '');
      if (cleanedValue.length <= 11) {
        setData((prev) => ({
          ...prev,
          [name]: FormatUtils.phoneNumber(cleanedValue),
        }));
      }
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

  const handleSelect = (selectedOption: string) => {
    setData((prev) => ({
      ...prev,
      address: selectedOption,
    }));
  };

  const handleOpenConfirmModal = () => {
    openModal('myPageConfirmModal', ConfirmModal, {
      // onConfirm: () => //페이지로 이동
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateMyPageForm(data);
    if (Object.values(validationErrors).some((error) => error !== null)) {
      setErrors(validationErrors);
    } else {
      handleOpenConfirmModal();
    }
  };

  return (
    <div className="flex-center mt-32px">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="tablet:flex tablet:justify-between tablet:gap-20px pc:flex pc:gap-20px">
          <div className="pc:flex pc:justify-between pc:basis-2/3 gap-20px w-full">
            <div className="mb-20px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="name">이름*</FormGroup.Label>
                <FormGroup.InputField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="입력"
                  className="flex input-base"
                  value={data.name}
                  onChange={handleChangeData}
                />
                <FormGroup.ErrorMessage errorMessage={errors.name} />
              </FormGroup>
            </div>
            <div className="mb-60px h-58px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="phone">연락처*</FormGroup.Label>
                <FormGroup.InputField
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="입력"
                  className="flex input-base"
                  value={data.phone}
                  onChange={handleChangeData}
                />
                <FormGroup.ErrorMessage errorMessage={errors.phone} />
              </FormGroup>
            </div>
          </div>
          <div className="mb-20px w-full pc:basis-1/3">
            <FormGroup>
              <FormGroup.Label htmlFor="address">선호 지역</FormGroup.Label>
              <Dropdown options={LOCATIONS} onSelect={handleSelect} />
            </FormGroup>
          </div>
        </div>
        <div className="mb-20px">
          <FormGroup>
            <FormGroup.Label htmlFor="bio">소개</FormGroup.Label>
            <FormGroup.InputField.Textarea
              id="bio"
              name="bio"
              placeholder="소개를 입력하세요"
              className="h-153px"
              value={data.bio}
              onChange={handleChangeData}
            />
          </FormGroup>
        </div>

        <div className="mt-24px text-center">
          <Button className="button_large_active" type="submit">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
