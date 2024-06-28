import FormGroup from '@/components/FormGroup/FormGroup';

interface InputComponentProps {
  id: string;
  name: string;
  type: 'input' | 'textarea';
  placeholder: string;
  value: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage: string;
}

export default function InputComponent({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onChangeTextArea,
  errorMessage,
}: InputComponentProps) {
  return (
    <>
      <FormGroup className="my-4px">
        <FormGroup.Label htmlFor={id}>{name}</FormGroup.Label>
        {type === 'input' ? (
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
          <FormGroup.InputField.Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeTextArea}
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
