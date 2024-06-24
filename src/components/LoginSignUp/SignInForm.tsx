import { useState } from 'react';
import Button from '../Button/Button';
import InputComponent from './InputComponent';

const SignInForm = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  return (
    <form className="flex flex-col">
      <h1 className="font-bold text-center mb-24px text-24px">로그인</h1>
      <InputComponent
        id="loginId"
        type="text"
        placeholder="이메일"
        value={loginId}
        onChange={(event) => setLoginId(event.target.value)}
      />
      <InputComponent
        id="loginPassWord"
        type="password"
        placeholder="비밀번호"
        value={loginPwd}
        onChange={(event) => setLoginPwd(event.target.value)}
      />
      <Button className="w-full button_medium_active" type="submit">
        로그인 하기
      </Button>
    </form>
  );
};

export default SignInForm;
