import { ChangeEvent } from 'react';
import FormGroup from '../FormGroup/FormGroup';

interface InputComponentProps {
  id: string;
  name: string;
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

export default function InputComponent({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}: InputComponentProps) {
  return (
    <>
      <FormGroup className="my-4px">
        <FormGroup.Label htmlFor={id}>{placeholder}</FormGroup.Label>
        {type === 'email' ? (
          <FormGroup.InputField.Text
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border rounded px-10px my-8px text-18px h-56px"
          />
        ) : (
          <FormGroup.InputField.Password
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border rounded px-10px my-8px text-18px h-56px"
          />
        )}
        <FormGroup.ErrorMessage errorMessage={errorMessage} />
      </FormGroup>
    </>
  );
}
