import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import { LOCATIONS } from '@/constants/DataLocations';

export interface FormData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

interface MyPageInputProps {
  initialData?: FormData;
}

export default function MyPageInput({ initialData }: MyPageInputProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: '',
      phone: '',
      address: '',
      bio: '',
    }
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (value: string) => {
    setFormData({ ...formData, address: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form validation and submission logic here
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
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {/* <FormGroup.ErrorMessage errorMessage={errors.name} /> */}
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
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {/* <FormGroup.ErrorMessage errorMessage={errors.phone} /> */}
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
              value={formData.bio}
              onChange={handleInputChange}
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
