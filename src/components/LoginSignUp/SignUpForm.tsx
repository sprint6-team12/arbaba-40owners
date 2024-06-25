import { useState } from 'react';
// import userAPI from '@/utils/api/userAPI';
import Button from '../Button/Button';
import InputComponent from './InputComponent';
import MemberTypeToggle from './MemberTypeToggle';

const SignUpForm = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('');
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee');
  const [errors, setErrors] = useState({
    signUpEmail: '',
    signUpPassword: '',
    signUpPasswordConfirm: '',
  });

  const isValidate = (name: string, value: string) => {
    let errorMessage = '';
    if (name === 'signUpEmail') {
      if (!value) {
        errorMessage = '이메일을 입력해주세요.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = '유효한 이메일 주소를 입력해주세요.';
      }
    }
    if (name === 'signUpPassword') {
      if (!value) {
        errorMessage = '비밀번호를 입력해주세요.';
      } else if (value.length < 8) {
        errorMessage = '비밀번호는 최소 8자 이상이어야 합니다.';
      }
    }
    if (name === 'signUpPasswordConfirm') {
      if (signUpPassword !== value) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      }
    }
    return errorMessage;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = isValidate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    if (name === 'signUpEmail') setSignUpEmail(value);
    if (name === 'signUpPassword') setSignUpPassword(value);
    if (name === 'signUpPasswordConfirm') setSignUpPasswordConfirm(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !errors.signUpEmail &&
      !errors.signUpPassword &&
      !errors.signUpPasswordConfirm
    ) {
      // 성공
      // try {
      //   const response = await userAPI.postUserData({
      //     email: signUpEmail,
      //     password: signUpPassword,
      //     type: userType,
      //   });
      //   if (response.status === 201) {
      //     onSignUpSuccess();
      //   }
      // } catch (error) {
      //   // error
      //   return;
      // }
      onSignUpSuccess(); // 임시
    }
  };

  const handleUserTypeClick = (type: 'employee' | 'employer') => {
    if (userType !== type) {
      setUserType(type);
    }
  };

  return (
    <form className="flex flex-col" autoComplete="off" onSubmit={handleSubmit}>
      <h1 className="font-bold text-center mb-24px text-24px">회원가입</h1>
      <InputComponent
        id="signUpEmail"
        name="signUpEmail"
        type="email"
        placeholder="이메일"
        value={signUpEmail}
        onChange={handleInputChange}
        errorMessage={errors.signUpEmail}
      />
      <InputComponent
        id="signUpPassword"
        name="signUpPassword"
        type="password"
        placeholder="비밀번호"
        value={signUpPassword}
        onChange={handleInputChange}
        errorMessage={errors.signUpPassword}
      />
      <InputComponent
        id="signUpPasswordConfirm"
        name="signUpPasswordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={signUpPasswordConfirm}
        onChange={handleInputChange}
        errorMessage={errors.signUpPasswordConfirm}
      />
      <MemberTypeToggle userType={userType} onClick={handleUserTypeClick} />
      <Button className="w-full button_medium_active" type="submit">
        가입하기
      </Button>
    </form>
  );
};

export default SignUpForm;
