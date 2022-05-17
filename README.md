# NextJS 특징

# 0. Framework & library

라이브러리와 프레임워크의 주요 차이점 - "Inversion of Control"(통제의 역전)

라이브러리에서 메서드를 호출하면 사용자가 제어할 수 있습니다.
그러나 프레임워크에서는 제어가 역전되어 프레임워크가 사용자를 호출합니다.

- 라이브러리
  사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림
  개발자가 어떤 프로그램을 가져다 쓰는것 (Ex React.js: 렌더링할때 ReactDOM.render()를 불러와서 사용하며 유저가 변경할 수 있다.)
- 프레임워크
  파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름
  개발자의 코드를 프로그램이 불러오는 것 (Ex Next.js: 정해진 규칙에 따라 코드를 작성해야만 렌더링이 올바르게 된다.)

# 1. Pages

pages 폴더 안에 있는 파일명에 따라 route가 결정된다.

pages/about.js 생성 -> localhost:3000/about (사용가능)
다만 예외사항으로, index.js의 경우에는 앱이 시작하는 파일이라고 보면 된다. 즉 localhost:3000 그 자체다 뒤에 /index 로 붙이면 안된다.

또한, nextJS 프레임워크 사용 시
import react from "react"를 쓸 필요가 없다. 다만 useState,useEffect, lifecycle method 같은 애들을 써야 할 경우에는 꼭 import를 해줘야 한다.

# 2. Static Pre Rendering

- (ReactJS) Client Side Rendering - Browser(유저)가 자바스크립트를 실행시켜 UI를 빌딩한다. 그래서 비어있는 div 호출한 후에 자바스크립트/리액트를 호출 하는 것을 확인할 수 있다. (실제로 개발자도구를 열어 요소를 확인해보면 html내에 아무것도 없는것 확인 가능). 브라우저가 모두 다 loading & fetch 한다. 그리하여 단점은 자바스크립트를 비활성화 한 유저는 해당 앱을 사용할 수 없으며, 네트워크 속도가 느릴 시 화면 렌더링이 매우 느리게 되는 것을 확인 할 수 있다.
- (NextJS) Server Side Rendering - Real Html 가져옵니다. (pre-rendering, reactJS가 백엔드에서 먼저 실행하여 컴포넌트들을 렌더링 시킨다.). 컴포넌트들이 미리 렌더링 된 후, 브라우저의 API 호출에 대한 응답값을 받아 컴포넌트를 패치한다. (reactJS 및 스크립트를 프론트에서 실행 -> hydration 방식이라고 일컫는다)

# 3. Routing

- 페이지 간 클라이언트 측 경로 전환을 활성화하고 single-page in app 경험을 제공하려면 Next에서 제공하는 Link 컴포넌트를 이용해야 합니다.

```
// 변경 전
<a href="/about">About</a>

// 변경 후
import Link from 'next/link'
<Link href="/about"><a>About</a></Link>
```

https://nextjs.org/docs/messages/no-html-link-for-pages

- useRouter()
  앱의 함수 컴포넌트에서 Router 객체 내부에 접근하려면 userRouter()훅을 사용할 수 있습니다.
  useRouter는 React Hook입니다. 즉, 클래스와 함께 사용할 수 없습니다. withRouter를 사용하거나 클래스를 함수 컴포넌트로 래핑할 수 있습니다.

```
const router = useRouter();
```

https://nextjs.org/docs/api-reference/next/router#userouter

# 4. CSS module

anything.module.css 형식의 모듈 파일을 생성한 후 import 해서 사용한다. 모듈방식을 사용하면 클래스 네임의 충돌을 걱정할 필요가 사라지지만, 해당 방식처럼 사용한다면 css 파일이 엄청 늘어날 수 있다.
`import styles from './NavBar.module.css`
해당 모듈(스타일시트)를 사용하는 방법

1. 백탭: className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}
2. 배열형식: [styles.link, router.pathname === "/" ? styles.active : ""].join(" ")

# 5. styled CSS // NextJS 고유의 방식(?)

styled-jsx를 사용하는 컴포넌트 다음과 같이 정의합니다

```
< style jsx>{`
CSS 스타일..
`}< /style>
```

https://github.com/vercel/styled-jsx

# 6. Custom App & global.css

Next.js는 App 컴포넌트를 사용하여 page를 초기화합니다. 또한 App 컴포넌트는 커스터마이징이 가능하며, 페이지 초기화를 제어 및 아래와 같은 기능을 수행할 수 있습니다.

1. 페이지 변경 간에 레이아웃 유지
2. 페이지 탐색 시 state 유지
3. componentDidCatch를 사용한 Custom 에러 처리
4. 페이지에 추가 데이터 삽입
5. Global CSS 추가

기본 App을 재정의하려면 아래와 같이 ./pages/\_app.js 파일을 만듭니다.

```
export default function MyApp({ Component, pageProps }) {
return < Component {...pageProps} />
}
```

https://nextjs.org/docs/advanced-features/custom-app

또한 .css 파일은 App 이외 다른 컴포넌트에서 사용할 수 없으며,
다른 컴포넌트에서 스타일시트를 적용하고 싶다면 무조건 module.css 형식으로 변경한 후 임포트하여 사용해야한다.
https://nextjs.org/docs/messages/css-global

# RECAP https://nomadcoders.co/nextjs-fundamentals/lectures/3444
