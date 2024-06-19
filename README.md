svgr 사용방법

```
import LogoSVG from "public/assets/logo.svg";

const Header = () => {
  return (
    <div>
      <LogoSVG />
    </div>
  );
};

export default Header;
```

husky 설명

pre-commit을 통해 커밋전, lint와 prettier를 실행합니다
(이때 캐시된 파일만을 검사하고, 자동 수정되면 그 결과를 덮어쓰기해 add 합니다)
prepare-commit-msg를 통해 커밋 메세지 앞에 지라 이슈넘버를 붙여줍니다
commit-msg를 통해 커밋메세지가 정해놓은 형식이 맞는지 검사합니다
