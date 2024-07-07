## 아르바바와 40인의 사장들

급하게 알바가 필요할 때 !

사장님도 알바생도 이용하는, 기존보다 높은 시급으로 알바를 빠르게 구할 수 있는 서비스입니다

![image](https://github.com/sprint6-team12/the-julge/assets/154623483/2ad57a8a-521f-413d-8939-7aa3c3f75322)

<br>
<br>

## 팀원 소개

|                                           김제완                                           |                                              원찬희                                               |                                         📢 이도요                                         |                                           이정민                                           |                                           주강산                                           |
| :----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/162148781?v=4" width="150" height="150"> |     <img src="https://avatars.githubusercontent.com/u/97877328?v=4" width="150" height="150">     | <img src="https://avatars.githubusercontent.com/u/83871696?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/154623483?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/162934516?v=4" width="150" height="150"> |
|                          [@Berrnuda](https://github.com/Berrnuda)                          |                              [@wch2208](https://github.com/wch2208)                               |                           [@doh-yo](https://github.com/doh-yo)                            |                             [@oris8](https://github.com/oris8)                             |                        [@JooKangsan](https://github.com/JooKangsan)                        |
| # 로그인, 회원가입 페이지<br>가게 상세 페이지<Br># 컴포넌트 - Filter<br>(공고검색시 사용)  | # 공고리스트 페이지<br>(공고 검색결과 페이지 포함)<br># 컴포넌트 - (List)Table, Badge, Pagination |               # 공고등록 페이지, 마이페이지<br># 컴포넌트 - GNB,footer,Post               |        # 공고상세 페이지 <br>(일반회원/사장님)<br># 컴포넌트 - Modal, Popup, Input         | # 가게 등록 페이지 <br>가게 편집페이지<br>#컴포넌트 - Button, Dropdown <br> # API 함수제작 |
|                              UI/UX 개선사항 논의,<br> QA 관리                              |                                   UI/UX 개선사항 논의,<br>발표                                    |                         팀장, <br> 팀내 디자인 작업,<br>발표 PPT                          |           초기 작업 환경 설정,<br>UI/UX 개선사항 논의<br>리드미 작성 및 QA 관리            |                      스타일 초기설정,<br> 노션 관리, <br> 서비스 배포                      |

<br>
<br>

## 💻 사용 기술

- ### 협력

  - 원활한 협력을 위해 [notion](https://www.notion.so/part3-12-2e36b18474754374ba9640bd24dac669)에 팀규칙을 기록하고, discord로 소통, [jira](https://dodobirdy.atlassian.net/jira/software/projects/DD/boards/1/timeline)를 통해 이슈를 관리했습니다
  - `Eslint`와 `prettier`를 사용해 일관된 코드스타일을 유지하려 노력했습니다
  - `git hooks(husky)`를 이용해 main branch에 불필요한 에러와 커밋을 방지했습니다

<br>
  <details style="margin-left: 70px;">
  <summary> [팀 Notion] 스크린샷으로 미리 보기 😎</summary>
<img width="700" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/406b6ddf-9983-420a-86ae-a7ae05b1b028">
<img width="700" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/7ad24f65-8a69-4efb-aa4c-44aa6b621ec8">
</details>
<br>

- ### Development

  - `Next.js` PageRouter

    (개발기간이 짧았기에 더 익숙하고, 에러가 더 적으며, 정보가 많은 `PageRouter`를 선택했습니다)

  - `TypeScript`을 사용

    (타입을 이용해 에러를 방지하고, 타입 명시로 협업시 다른 사람의 코드 파악이 쉬워질 수 있도록 노력했습니다)

  - `Recoil`을 이용한 상태 관리

    (리액트의 useState와 유사한 방법으로 사용하기 때문에, 러닝커브가 적어 바로 도입할 수 있다고 판단해 선택했습니다.)

  - `TailwindCSS` 사용

    (css-in-js 방식이 아니기에 next에 적합했고, 스타일 작업 속도를 향상 시키기위해 도입했습니다.)

  - `Axios` 사용

    (page router를 선택했기에 axios사용에 부담이 없었고, instance기능과 자동적인 에러처리 등 DX 향상을 위해 도입했습니다)

<br>
<br>

- ### 배포

  - `vercel`을 통해 배포했습니다

<br>
<br>
<br>

## 📌 개발 기간 및 작업 관리

### 전체 개발 기간 : 2024-06-21 ~ 2024-07-07<br>

<img src="https://github.com/sprint6-team12/the-julge/assets/154623483/f4bcddb9-92a3-486f-aa71-e6eb7041f08c" height="250"/>
<br>
<br>

### 작업 관리

개발 시작 전 `UserFlow`를 작성해보면서 시안을 명확히 파악하고 업무를 분배하였습니다

<details>
  <summary> 강산님, 찬희님이 작성해주신 UserFlow 😎</summary>

<img src="https://github.com/sprint6-team12/the-julge/assets/154623483/8e14af32-20bc-4508-a9d4-6051821f0c44" width="700"/>
<img src="https://github.com/sprint6-team12/the-julge/assets/154623483/d1185afa-ac21-4c6a-b27b-aebc3a66f4ee" width="700"/> 
</details>

<br>
<br>

매일 오후 `데일리스크럼`을 통해 프로젝트 관련 회의를 나누고,

데일리스크럼 이후 2시간 `코어타임`을 가졌습니다

<br>

`퇴근스레드`로 퇴근 시에 오늘 한 일, 내일 할 일을 공유했습니다

(데일리스크럼을 비교적 늦은 시간에 진행했기때문에 (오후 4시) 추가적인 진행 상황 공유와 퇴근 후 개인시간 보장 목적으로 도입)

<br>

<br>

### jira

지라의 타임라인, 백로그, 보드를 이용해 기본적인 이슈관리를 진행하였습니다

스프린트 기능을 활용해 에자일하게 개발을 진행하려고 노력했습니다.

이슈를 활용해 의견을 주고받음으로서 소통내용이 흩어지지 않고 효율적으로 의견을 관리할 수 있었습니다

<details>
  <summary> 이런 식으로 이슈에 대해 이야기를 나눴어요 🧐</summary>
 <img src="https://github.com/sprint6-team12/the-julge/assets/154623483/381d99c4-13a1-4954-9fa0-0ebab81092f6" width="700"/>
<img src="https://github.com/sprint6-team12/the-julge/assets/154623483/50e23e58-6c1c-4ccb-8b39-6856ee39f305" width="700"/>
</details>

<br>

### 코드리뷰

코드리뷰 문화를 통해 서로 개발지식을 공유하고 소통하면서 프로젝트 코드를 발전시키려는 노력을 꾸준히 진행했습니다

<details>
  <summary> 이런 식으로 코드리뷰를 진행했어요 🧐</summary>
<img width="700" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/a21a88b7-e8bd-4bba-954c-a2c81521089a">
<img src="https://github.com/sprint6-team12/the-julge/assets/154623483/9cea317b-1e82-4e44-918a-c94eee032f6b" width="700"/>
</details>

<br>
<br>
<br>
<br>

## 🥊 트러블 슈팅

[글 확인하러 가기](https://www.notion.so/f5de7ca1afec49a0afd5a5971f323d34?v=089820b5e2464642bded7d7575b7f22a)

<img width="654" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/67028912-9115-4127-be0d-09094845a928">

<br>
<br>

## 📖 페이지별 기능

<img width="1068" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/c7cb9e7b-93a5-48d0-9fc5-5c80f487ae57">

![로그인](https://github.com/sprint6-team12/the-julge/assets/154623483/6eb2130f-d3ff-421f-86f5-02813caa4d8f)

![검색](https://github.com/sprint6-team12/the-julge/assets/154623483/2d65b8f6-e624-46fa-80a4-4dbcec4a979a)

<img width="1068" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/01bee522-98f2-4892-ab2a-32634dd8e0c9">

![Jul-07-2024 22-59-47](https://github.com/sprint6-team12/the-julge/assets/154623483/528f0be0-b44c-457d-b6ed-3e36d8014513)

![Jul-07-2024 23-00-17](https://github.com/sprint6-team12/the-julge/assets/154623483/8e0f4256-9679-4053-8252-612e28ad0da5)

![Jul-07-2024 23-01-16](https://github.com/sprint6-team12/the-julge/assets/154623483/5ca2d540-2aef-405f-9693-183cc4e2232b)
<br>
<br>
<br>

## 📁 프로젝트 구조

```
프로젝트 파일/
├── public/                  # 정적 파일(이미지, 폰트 등)
│   ├── favicon.ico
│   └── images/
├── src/                     # 소스 코드 폴더
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── pageComponents/  # 페이지 종속성 컴포넌트
│   │   │   └── items/
│   │   │        └── index.tsx
│   │   └──  .
│   │        .
│   │        .
│   │
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── _app.tsx         # 글로벌 설정
│   │   ├── _document.tsx    # 문서 설정
│   │   └── index.tsx        # 루트 경로 페이지
│   ├── styles/              # 스타일 파일
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── lib/                 # 유틸리티 함수, API 클라이언트 등
│   │   ├── api/
│   │   └── utils/
│   ├── hooks/               # 커스텀 훅
│   ├── types/               # 타입 선언 파일
│   │   └── User.d.ts          (기본적인 데이터 타입을 전역 타입 파일로 관리)
│   ├── recoil/              # 리코일 관련 파일
│   │   └─atoms/
│   └── constants/           # 상수파일
├── node_modules/            # 프로젝트 의존성
├── .env                     # 환경 변수 파일
├── .gitignore               # Git 무시 파일
├── tsconfig.json            # TypeScript 설정 파일
├── tailwind.config.js       # Tailwind CSS 설정 파일
├── postcss.config.js        # PostCSS 설정 파일
├── package.json             # 프로젝트 메타데이터 및 스크립트
└── next.config.js           # Next.js 설정 파일

```

## 짧은 후기

<img width="1068" alt="image" src="https://github.com/sprint6-team12/the-julge/assets/154623483/ee4fea57-71c3-433e-a59e-29beaf02be36">
