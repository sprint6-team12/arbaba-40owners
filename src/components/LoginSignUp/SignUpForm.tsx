import { useState } from 'react';
import Button from '../Button/Button';
import InputComponent from './InputComponent';
import MemberTypeToggle from './MemberTypeToggle';

const SignUpForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee');

  const handleUserTypeClick = (type: 'employee' | 'employer') => {
    if (userType !== type) {
      setUserType(type);
    }
  };

  return (
    <form className="flex flex-col" autoComplete="off">
      <h1 className="font-bold text-center mb-24px text-24px">회원가입</h1>
      <InputComponent
        id="signUpEmail"
        type="text"
        placeholder="이메일"
        value={id}
        onChange={(event) => setId(event.target.value)}
      />
      <InputComponent
        id="signUpPassword"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <InputComponent
        id="signUpPasswordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
      />
      <MemberTypeToggle userType={userType} onClick={handleUserTypeClick} />
      <Button className="w-full button_medium_active" type="submit">
        가입하기
      </Button>
    </form>
  );
};

export default SignUpForm;
