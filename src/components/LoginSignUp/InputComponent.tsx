import FormGroup from '@/components/FormGroup/FormGroup';

interface InputComponentProps {
  id: string;
  name: string;
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            className="px-10px my-8px text-18px"
          />
        ) : (
          <FormGroup.InputField.Password
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="px-10px my-8px text-18px"
          />
        )}
        {errorMessage === '' ? (
          <p className="h-14px"> </p>
        ) : (
          <FormGroup.ErrorMessage
            className="h-14px"
            errorMessage={errorMessage}
          />
        )}
      </FormGroup>
    </>
  );
}
