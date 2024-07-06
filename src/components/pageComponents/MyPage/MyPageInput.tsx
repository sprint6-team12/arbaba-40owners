import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import ConfirmModal from '@/components/pageComponents/AddShopPage/ConfirmModal';
import { SHOP_LOCATIONS } from '@/constants/shopOptions';
import useModal from '@/hooks/useModal';
import userAPI, { UserInfo } from '@/lib/api/userAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import {
  clearError,
  hasErrors,
  handleInputChange,
} from '@/lib/utils/FormUtils';
import { validateMyPageForm } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';

export interface UserInfoFormErrors {
  name: string | null;
  phone: string | null;
  address?: string | null;
  bio?: string | null;
}

const initialFormData: UserInfo = {
  name: '',
  phone: '',
  address: '',
  bio: '',
};

const initialFormErrors: UserInfoFormErrors = {
  name: null,
  phone: null,
  address: null,
  bio: null,
};

export default function MyPageInput() {
  const { userId, type } = useRecoilValue(userState);
  const router = useRouter();
  const { openModal } = useModal();
  const [data, setData] = useState<UserInfo>(initialFormData);
  const [errors, setErrors] = useState<UserInfoFormErrors>(initialFormErrors);
  const setAuthState = useSetRecoilState(userState);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (userId: string) => {
    const userData = await userAPI.getUserData(userId, type, setAuthState);
    setData(userData.item);
  };

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      handlePhoneChange(value);
    } else {
      handleInputChange(setData, name, value);
    }

    clearError(setErrors, name as keyof UserInfoFormErrors);
  };

  const handlePhoneChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 11) {
      setData((prev) => ({
        ...prev,
        phone: FormatUtils.phoneNumber(cleanedValue),
      }));
    }
  };

  const handleDropdownSelect = (selectedOption: string) => {
    setData((prev) => ({
      ...prev,
      address: selectedOption,
    }));
  };

  const handleOpenConfirmModal = (content: string) => {
    openModal('myPageConfirmModal', ConfirmModal, {
      content: content,
      onConfirm: () => {
        if (userId) {
          router.push(`/users/${userId}`);
        }
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateMyPageForm(data);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    } else {
      try {
        if (userId) {
          const token = localStorage.getItem('token');
          await userAPI.putUserData(userId, token!, data, setAuthState);
          handleOpenConfirmModal('등록이 완료되었습니다.');
        } else {
          handleOpenConfirmModal('유효하지 않은 사용자 ID입니다.');
        }
      } catch (error) {
        handleOpenConfirmModal('데이터를 저장하는 중 오류가 발생했습니다.');
      }
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
            <h2 className="mb-6px">선호 지역</h2>
            <Dropdown
              options={SHOP_LOCATIONS}
              onSelect={handleDropdownSelect}
              defaultValue={data.address || '선택'}
            />
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
