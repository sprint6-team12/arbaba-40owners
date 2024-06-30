import { useState } from 'react';
import Button from '@/components/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import authenticationAPI from '@/lib/api/authenticationAPI';
import { SignInValidate } from '@/lib/utils/validation';
import InputComponent from './InputComponent';

const SignInForm = ({ onClose }: { onClose?: () => void }) => {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassWord: '',
  });
  const [errors, setErrors] = useState({ loginEmail: '', loginPassWord: '' });
  const { setUser } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = SignInValidate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!errors.loginEmail && !errors.loginPassWord) {
      try {
        const response = await authenticationAPI.postToken({
          email: formData.loginEmail,
          password: formData.loginPassWord,
        });
        const token = response.item.token;
        const userId = response.item.user.item.id;
        const userType = response.item.user.item.type;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', userType);
        setUser(token, userId, userType, true);
        if (onClose) {
          onClose();
        }
      } catch (error) {
        alert(error);
      }
    }
  };

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
};

export default SignInForm;
