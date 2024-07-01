import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalPrimary from '@/components/Modal/ModalPrimary';
import { SHOP_LOCATIONS } from '@/constants/shopOptions';
import useModal from '@/hooks/useModal';
import userAPI, { UserInfo } from '@/lib/api/userAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import { validateMyPageForm } from '@/lib/utils/InputValidation';
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

const ConfirmModal = ({ ...rest }) => (
  <ModalPrimary
    optionType="confirm"
    content="등록이 완료되었습니다."
    {...rest}
  />
);

export default function MyPageInput() {
  const { userId, token } = useRecoilValue(userState);
  const router = useRouter();
  const { openModal } = useModal();
  const [data, setData] = useState<UserInfo>(initialFormData);
  const [errors, setErrors] = useState<UserInfoFormErrors>(initialFormErrors);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userData = await userAPI.getUserData(userId);
        setData(userData.item);
      }
    };
    fetchUserData();
  }, [userId]);

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

  const handleDropdownSelect = (selectedOption: string) => {
    setData((prev) => ({
      ...prev,
      address: selectedOption,
    }));
  };

  const handleOpenConfirmModal = () => {
    openModal('myPageConfirmModal', ConfirmModal, {
      onConfirm: () => {
        router.push(`/users/${userId}`);
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateMyPageForm(data);
    if (Object.values(validationErrors).some((error) => error !== null)) {
      setErrors(validationErrors);
      return;
    }
    if (!userId) {
      alert(errors);
      return;
    }
    try {
      await userAPI.putUserData(userId, token, data);
      handleOpenConfirmModal();
    } catch (error) {
      alert(error);
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
            <h2>선호 지역</h2>
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
