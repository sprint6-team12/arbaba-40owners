import Button from '@/components/Button/Button';
import LinkButton from './LinkButton';

function HowToButtonUse() {
  return (
    <div className="flex flex-col gap-4">
      <LinkButton className="button_medium" disabled={true} href="/">
        집에 이제 갈수 있나요?
      </LinkButton>
      <Button className="button_large" disabled={true}>
        버튼말고 딴거 하고 싶다
      </Button>
    </div>
  );
}

export default HowToButtonUse;
