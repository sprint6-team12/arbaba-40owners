import { useState } from 'react';
import Button from '../Button/Button';

const SignUpForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <form className="flex flex-col">
      <h1 className="mb-6 text-2xl font-bold text-center">회원가입</h1>
      <label className="text-left" htmlFor="signUpEmail">
        이메일
      </label>
      <input
        id="signUpEmail"
        type="text"
        placeholder="이메일"
        value={id}
        onChange={(event) => setId(event.target.value)}
        className="w-full px-5 py-4 my-2 text-lg border rounded h-14"
      />
      <label className="text-left" htmlFor="signUpPassword">
        비밀번호
      </label>
      <input
        id="signUpPassword"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full px-5 py-4 my-2 text-lg border rounded h-14"
      />
      <label className="text-left" htmlFor="signUpPasswordConfirm">
        비밀번호 확인
      </label>
      <input
        id="signUpPasswordConfirm"
        type="text"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
        className="w-full px-5 py-4 my-2 text-lg border rounded h-14"
      />
      <Button className="w-full button_medium_active" type="submit">
        가입하기
      </Button>
    </form>
  );
};

export default SignUpForm;
