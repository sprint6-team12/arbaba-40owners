import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import authenticationAPI from '@/utils/api/authenticationAPI';
import Button from '../Button/Button';
import InputComponent from './InputComponent';

const SignInForm = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassWord, setLoginPassWord] = useState('');
  const [errors, setErrors] = useState({ loginEmail: '', loginPassWord: '' });
  const { setUser } = useAuth();

  const isValidate = (name: string, value: string) => {
    let errorMessage = '';
    if (name === 'loginEmail') {
      if (!value) {
        errorMessage = '이메일을 입력해주세요.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = '유효한 이메일 주소를 입력해주세요.';
      }
    }
    if (name === 'loginPassWord') {
      if (!value) {
        errorMessage = '비밀번호를 입력해주세요.';
      } else if (value.length < 8) {
        errorMessage = '비밀번호는 최소 8자 이상이어야 합니다.';
      }
    }
    return errorMessage;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = isValidate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    if (name === 'loginEmail') setLoginEmail(value);
    if (name === 'loginPassWord') setLoginPassWord(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!errors.loginEmail && !errors.loginPassWord) {
      try {
        const res = await authenticationAPI.post({
          email: loginEmail,
          password: loginPassWord,
        });

        const token = res.item.token;
        const userId = res.item.user.item.id;
        const userType = res.item.user.item.type;
        localStorage.setItem('testToken', token);
        setUser(token, userId, userType);
      } catch (error) {
        // error
      }
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h1 className="font-bold text-center mb-24px text-24px">로그인</h1>
      <InputComponent
        id="loginEmail"
        name="loginEmail"
        type="email"
        placeholder="이메일"
        value={loginEmail}
        onChange={handleInputChange}
        errorMessage={errors.loginEmail}
      />
      <InputComponent
        id="loginPassWord"
        name="loginPassWord"
        type="password"
        placeholder="비밀번호"
        value={loginPassWord}
        onChange={handleInputChange}
        errorMessage={errors.loginPassWord}
      />
      <Button className="w-full button_medium_active" type="submit">
        로그인 하기
      </Button>
    </form>
  );
};

export default SignInForm;
