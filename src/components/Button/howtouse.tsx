import Button from '@/components/Button/Button';

function HowToUse() {
  return (
    <div className="flex flex-col gap-4">
      <Button className="button_large" disabled={true}>
        로그인 하기
      </Button>
      <Button className="button_large" disabled={false}>
        로그인 하기
      </Button>
      <Button className="button_medium" disabled={true}>
        로그인 하기
      </Button>
      <Button className="button_medium" disabled={false}>
        로그인 하기
      </Button>
      <Button className="button_small" disabled={true}>
        로그인 하기
      </Button>
      <Button className="button_small" disabled={false}>
        로그인 하기
      </Button>
      <Button className="button_large_disApply">신청불가</Button>
      <Button className="button_small_disApply">신청불가</Button>
      <Button className="button_Ok">확인</Button>
    </div>
  );
}

export default HowToUse;
