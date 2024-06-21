Input 4종류 제작했습니다 (Text, Textarea, Password, Image)

Password 인풋만 비밀번호 보이기 토글 기능이 추가되어있고 나머지는 기초적인 UI만 담당하고있습니다!
단순 Input을 변형해서 사용하려면 `<Input className="">` 방식으로 변형해서 사용하시면 됩니다

input디자인 변경이 크지 않은 것 같아서 일단 각 Text,Textarea,Password,Image 에는 기본 스타일 적용해 놓았습니다
대신 width와 height는 모두 100%로 설정되어있으니 가져다 쓰실때 꼭! 높이너비 설정해주고 써주세요

(이미지 인풋은 기본디자인만 입혀놓았습니다)

```javascript
// <main className="flex gap-8px flex-col p-100px">
  <Input.Text className="h-48px" placeholder="플레이스홀더 예시" />
  <Input.Textarea />
  <Input.Password />
  <Input.Image />

  <FormGroup className="my-100px">
    <FormGroup.Label htmlFor="password">라벨 예시</FormGroup.Label>
    <FormGroup.InputField.Password className="input-error"/>
    <FormGroup.ErrorMessage errorMessage="에러메세지예시입니다" />
  </FormGroup>

  <FormGroup className="mb-100px">
    <FormGroup.Label htmlFor="ex">InputWrapper 활용하기</FormGroup.Label>
    <FormGroup.InputWrapper className="flex input-base">
      <FormGroup.InputField id="ex" name="ex" />
      <span>원</span>
    </FormGroup.InputWrapper>
    <FormGroup.ErrorMessage errorMessage="에러메세지예시입니다" />
  </FormGroup>
// </main>
```

코드 보시고..
FormGroup이라는 컴포넌트가 있는데요
합성컴포넌트 방식으로,
FormGroup에 사용되는 컴포넌트들이 모아져있습니다
(마지막 예시처럼 원 같이 추가적인 디자인이 들어가야할때 유용합니다.
이렇게 input 내부에 디자인이 들어가야하는 경우에 InputWrapper를 이용해서
InputWrapper 자체에 input-base디자인을 주고, 내부를 원하는대로 디자인해주시면됩니다...이해되시나여)

ErrorMessage 컴포넌트는 errorMessage(string)을 받고 이게 null로 들어오면 자동으로 랜더링되지 않도록 컴포넌트 내부에서 처리해주고있습니다 참고해주세여,,

그리고 폼그룹전체를 감싸고있는 클래스에 gap-8px이 들어있습니다 (빼야하나 ?)

또...만약에 에러가 나서 input에 빨간 border를 넣어줘야하는 경우..

`<FormGroup.InputField.Password className="input-error"/>`
이런식으로 사용하시는 페이지에서 처리를 해주셔야합니다

error프롭을 받을수도있을거같은데 뭐 그거나 이거나 비슷할거같아서 일단 이렇게 해놨어요

++그리고 아마 그 미션때 쓴 폼라이브러리 쓸거같아서 ref추가해줬구 로직작업 패쓰 했습니다
