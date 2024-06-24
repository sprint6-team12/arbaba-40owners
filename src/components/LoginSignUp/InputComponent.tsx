import { ChangeEvent } from 'react';
import Input from '../Input/Input';

interface InputComponentProps {
  id: string;
  type: 'text' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputComponent({
  id,
  type,
  placeholder,
  value,
  onChange,
}: InputComponentProps) {
  return (
    <>
      <label className="text-left" htmlFor={id}>
        {placeholder}
      </label>
      {/* <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-10px py-8px my-8px text-18px h-56px"
      /> */}
      {type === 'text' ? (
        <Input.Text
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border rounded px-10px py-8px my-8px text-18px h-56pxr"
        />
      ) : (
        <Input.Password
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex items-center justify-end w-full border rounded px-10px py-8px my-8px text-18px h-56px"
        />
      )}
    </>
  );
}
