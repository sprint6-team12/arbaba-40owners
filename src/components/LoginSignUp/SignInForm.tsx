// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import authenticationAPI from '@/utils/api/authenticationAPI';
import Button from '@/components/Button/Button';
import { SignInValidate } from '@/utils/validation';
import InputComponent from './InputComponent';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassWord: '',
  });
  const [errors, setErrors] = useState({ loginEmail: '', loginPassWord: '' });
  // const { setUser } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = SignInValidate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!errors.loginEmail && !errors.loginPassWord) {
      // try {
      //   const res = await authenticationAPI.post({
      //     email: loginEmail,
      //     password: loginPassWord,
      //   });
      //   const token = res.item.token;
      //   const userId = res.item.user.item.id;
      //   const userType = res.item.user.item.type;
      //   localStorage.setItem('testToken', token);
      //   setUser(token, userId, userType);
      // } catch (error) {
      //   // error
      // }
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
};

export default SignInForm;
