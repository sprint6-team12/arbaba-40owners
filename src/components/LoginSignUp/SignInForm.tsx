import { useState } from 'react';
import Button from '../Button/Button';

const SignInForm = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  return (
    <form className="flex flex-col">
      <h1 className="mb-6 text-2xl font-bold text-center">로그인</h1>
      <label className="text-left" htmlFor="loginId">
        이메일
      </label>
      <input
        id="loginId"
        type="text"
        placeholder="이메일"
        value={loginId}
        onChange={(event) => setLoginId(event.target.value)}
        className="w-full px-5 py-4 my-2 text-lg border border-solid rounded h-14 min-w-190px"
      />
      <label className="text-left" htmlFor="loginPassWord">
        비밀번호
      </label>
      <input
        id="loginPassWord"
        type="password"
        placeholder="비밀번호"
        value={loginPwd}
        onChange={(event) => setLoginPwd(event.target.value)}
        className="w-full px-5 py-4 my-2 text-lg border border-solid rounded h-14"
      />
      <Button className="w-full button_medium_active" type="submit">
        로그인 하기
      </Button>
    </form>
  );
};

export default SignInForm;
