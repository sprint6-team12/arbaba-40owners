import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '@/components/Button/Button';
import usePopup from '@/hooks/usePopup';
import authenticationAPI from '@/lib/api/authenticationAPI';
import userAPI from '@/lib/api/userAPI';
import { SignInValidate } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';
import InputComponent from './InputComponent';

export default function SignInForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassWord: '',
  });
  const [errors, setErrors] = useState({ loginEmail: '', loginPassWord: '' });
  const setAuthState = useSetRecoilState(userState);
  const { userId, type } = useRecoilValue(userState);
  const { openPopup } = usePopup();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = SignInValidate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const openTostPopup = (errors: any) => {
    openPopup('loginErrorMessage', errors.message, 2500);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !errors.loginEmail &&
      !errors.loginPassWord &&
      formData.loginEmail !== '' &&
      formData.loginPassWord !== ''
    ) {
      try {
        await authenticationAPI.postToken(
          {
            email: formData.loginEmail,
            password: formData.loginPassWord,
          },
          setAuthState
        );

        if (onClose) {
          onClose();
        }
      } catch (error) {
        openTostPopup(error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      userAPI.getUserData(userId, type, setAuthState);
    }
  }, [userId, type, setAuthState]);

  return (
    <form
      className="flex flex-col w-full max-w-[300px]"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-center mb-24px text-24px">로그인</h1>
      <InputComponent
        id="loginEmail"
        name="loginEmail"
        type="email"
        placeholder="이메일"
        value={formData.loginEmail}
        onChange={handleInputChange}
        errorMessage={errors.loginEmail}
      />
      <InputComponent
        id="loginPassWord"
        name="loginPassWord"
        type="password"
        placeholder="비밀번호"
        value={formData.loginPassWord}
        onChange={handleInputChange}
        errorMessage={errors.loginPassWord}
      />
      <Button className="w-full button_medium_active" type="submit">
        로그인 하기
      </Button>
    </form>
  );
}
