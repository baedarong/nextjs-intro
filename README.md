# All about NEXTJS FRAMEWORK with React

# 1.0. Framework & library

라이브러리와 프레임워크의 주요 차이점 - "Inversion of Control"(통제의 역전)

라이브러리에서 메서드를 호출하면 사용자가 제어할 수 있습니다.
그러나 프레임워크에서는 제어가 역전되어 프레임워크가 사용자를 호출합니다.

- 라이브러리 |
  사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림
  개발자가 어떤 프로그램을 가져다 쓰는것 (Ex React.js: 렌더링할때 ReactDOM.render()를 불러와서 사용하며 유저가 변경할 수 있다.)
- 프레임워크 |
  파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름
  개발자의 코드를 프로그램이 불러오는 것 (Ex Next.js: 정해진 규칙에 따라 코드를 작성해야만 렌더링이 올바르게 된다.)

# 1.1. Pages

pages 폴더 안에 있는 파일명에 따라 route가 결정된다.

- pages/about.js 생성 -> localhost:3000/about (사용가능)
  다만 예외사항으로, index.js의 경우에는 앱이 시작하는 파일이라고 보면 된다. 즉 localhost:3000 그 자체다 뒤에 /index 로 붙이면 안된다.

- 또한, nextJS 프레임워크 사용 시
  import react from "react"를 쓸 필요가 없다. 다만 useState,useEffect, lifecycle method 같은 애들을 써야 할 경우에는 꼭 import를 해줘야 한다.

# 1.2. Static Pre Rendering

- Client Side Rendering | Browser(유저)가 자바스크립트를 실행시켜 UI를 빌딩한다. 그래서 비어있는 div 호출한 후에 자바스크립트/리액트를 호출 하는 것을 확인할 수 있다. (실제로 개발자도구를 열어 요소를 확인해보면 html내에 아무것도 없는것 확인 가능). 브라우저가 모두 다 loading & fetch 한다. 그리하여 단점은 자바스크립트를 비활성화 한 유저는 해당 앱을 사용할 수 없으며, 네트워크 속도가 느릴 시 화면 렌더링이 매우 느리게 되는 것을 확인 할 수 있다.
- Server Side Rendering | Real Html 가져옵니다. (pre-rendering, reactJS가 백엔드에서 먼저 실행하여 컴포넌트들을 렌더링 시킨다.). 컴포넌트들이 미리 렌더링 된 후, 브라우저의 API 호출에 대한 응답값을 받아 컴포넌트를 패치한다. (reactJS 및 스크립트를 프론트에서 실행 -> hydration 방식이라고 일컫는다)

# 1.3. Routing

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

# 1.4. CSS module

anything.module.css 형식의 모듈 파일을 생성한 후 import 해서 사용한다. 모듈방식을 사용하면 클래스 네임의 충돌을 걱정할 필요가 사라지지만, 해당 방식처럼 사용한다면 css 파일이 엄청 늘어날 수 있다.
`import styles from './NavBar.module.css`

- 해당 모듈(스타일시트)를 사용하는 방법

```
1. 백탭: className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}
2. 배열형식: [styles.link, router.pathname === "/" ? styles.active : ""].join(" ")
```

# 1.5. styled CSS // NextJS 고유의 방식(?)

styled-jsx를 사용하는 컴포넌트 다음과 같이 정의한다. 해당 방식이 가장 간단하지만 큰 프로젝트의 경우 공통모듈로 빼는 것을 추천한다.

```
< style jsx>{`
CSS 스타일..
`}< /style>
```

https://github.com/vercel/styled-jsx

# 1.6. Custom App & global.css

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

# CHAPTER 1 RECAP

https://nomadcoders.co/nextjs-fundamentals/lectures/3444

# 2.0 Patterns

- Layouts
  React 모델을 사용하면 페이지를 일련의 컴포넌트로 분해할 수 있습니다. 이러한 컴포넌트 중 많은 부분이 페이지 간에 재사용되는 경우가 많습니다(!). 예를 들어 모든 페이지에 동일한 navigation과 footer가 있을 수 있습니다. 번거로움을 덜기 위해 \_app.js에서 공통 컴포넌트를 호출하여 사용할 수 있지만 \_app.js이용을 최소화하고 싶은 경우엔, Navigation Component를 만들어 서브로 사용합니다. props로는 eactJS 가 제공하는 children을 사용할 수 있는데, 이는 Layout 하위의 컴포넌트를 Layout 컴포넌트 안에서 이용할 때 사용 가능 합니다.
  https://nextjs.org/docs/basic-features/layouts

- Head (next/head)
  nextJs에서 제공하는 Head 컴포넌트를 이용하여 웹페이지 head를 html작성 없이 사용할 수 있습니다.
  https://nextjs.org/docs/api-reference/next/head

# 2.1 Fetching Data

```
async <-> await 익명함수, API fetch, setState, javascript map 등을 이용하여 데이터를 패치해오기
```

# 2.2 Redirect and Rewrite

Next.js에서 커스텀 설정을 하기 위해서는 프로젝트 디렉터리의 루트에 next.config.js 파일을 만들 수 있습니다. next.config.js는 JSON 파일이 아닌 일반 Node.js 커스텀 모듈입니다. Njext.js 서버 및 빌드 단계에서 사용되며 브라우저 빌드에는 포함되지 않습니다. 그러므로 설정 후에 항시 서버를 재기동 해야합니다.
https://nexts.org/docs/api-reference/next.config.js/introduction

- Redirects() URL변경됨 |
  Redirect을 사용하면 들어오는 request 경로를 다른 destination 경로로 Redirect할 수 있습니다. Redirect을 사용하려면 next.config.js에서 redirects 키를 사용할 수 있습니다. redirects은 source, destination 및 permanent 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수입니다.
  source: 들어오는 request 경로 패턴 (request 경로)
  destination: 라우팅하려는 경로 (redirect할 경로)
  permanent: true인 경우 클라이언트와 search 엔진에 redirect를 영구적으로 cache하도록 지시하는 308 status code를 사용하고, false인 경우 일시적이고 cache되지 않은 307 status code를 사용합니다.
  https://nextjs.org/docs/api-reference/next.config.js/redirects

- Rewrites() URL변경되지 않음 |
  Rewrites를 사용하면 들어오는 request 경로를 다른 destination 경로에 매핑할 수 있습니다.
  Rewrites은 URL 프록시 역할을 하고 destination 경로를 mask하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게 합니다. 반대로 redirects은 새 페이지로 reroute되고 URL 변경 사항을 표시합니다.
  https://nextjs.org/docs/api-reference/next.config.js/rewrites

# 2.3 Server Side Rendering

- getServerSideProps
  page에서 서버 측 랜더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. getServerSideProps는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다. 서버 사이드 렌더링을 사용하면 redirect 및 rewrite 프론트 기능을 사용할 수 없게됩니다. 이에 데이터를 다 가져와서 rendering 하는 방식 (서버 사이드 렌더링) vs 미리 정적 html을 불러온 후 데이터를 입힐지 (클라이언트 사이드 렌더링) 선택하여 구현하는것이 중요합니다.
  https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
- 특징

1. export 필수, 함수명 getServerSideProps 이름 필수, return Object & props key 필수
2. 서버, 즉 백엔드에서만 해당 코드를 pre-runninng 하기에 프론트에서 해당 내용을 확인할 수 없다.
3. props 데이터를 page로 전송하여 parameter로 사용이 가능하다.
4. 데이터가 유효할 때 전체적으로 화면이 보이는 방식이기 때문에 Loading Component를 사용 할 필요가 없다.

- getServerSideProps를 사용하여 request시 데이터 fetch하고 결과를 pre-rendering하기

```
// 매 request마다 실행됩니다.
export async function getServerSideProps() {
const res = await fetch(`https://.../data`); // origin URL
const data = await res.json();

// props를 통해 page에 data 전달
return { props: { data } }
}

// 전달받은 data로 랜더링
export default function Home({ data }) {
  data.map((var)=><div key={var.index}> {var.name} </div>))
}

```

# CHAPTER 2 RECAP 클라이언드 사이드 렌더링 vs 서버 사이드 렌더링

https://nomadcoders.co/nextjs-fundamentals/lectures/3449

- 클라이언드 사이드 렌더링 |
  데이터 패치 전에 미리 html 페이지를 export 하여 생성한다. (Static Generation) 고로 reactJs를 통해 차후에 들어오는 데이터가 자바스크립트에 의해 반영될지라도 html 소스에는 포함되지 않는다. 누구가 홈페이지에 접속했을 때 reactJs가 처리를 마치기 전까지는 initialPage를 확인할 수 있다. 즉) ReactJs의 처리가 완료될 때까지 기다려야하며 유저는 API에서 데이터를 받아올 때까지 "로딩중" 상태를 봐야한다.
- 서버 사이드 렌더링 |
  항상 html이 완전한 상태로 존재. 유저가 접속했을 때 모든 데이터가 존재하여 로딩중 상태를 보지 않는 상태. getServerSideProps 함수를 이용하며 오직 Backend에서만 해당 코드를 볼 수 있기에 fetch, DB요청,API 불러오기, API KEY 사용이 가능하다. 백엔드에서 API 모두 처리해야 유저가 페이지를 사용할 수 있다.

즉,
request time에 반드시 데이터를 fetch해와야 하는 페이지를 pre-render해야 하는 경우에는 getServerSideProps를 사용하고
데이터를 pre-render할 필요가 없다면 client side에서 데이터를 가져오는 것을 고려해야한다.
서버 사이드 렌더링은 사용자 대시보드 페이지에 적합하다 => 왜냐하면 대시보드는 사용자별 비공개 페이지이기 때문에 SEO와는 관련이 없으며 페이지를 미리 렌더링할 필요가 없다. 또한 데이터는 자주 업데이트되므로 요청 시 데이터를 가져와야 하기 때문이다.

# 2.5 Dynamic Routes

- Dynamic Routes
  Next.js에서는 page에 대괄호([param])를 추가하여 Dynamic Route를 생성할 수 있습니다.
  /movies/1, /movies/abc 등과 같은 모든 경로는 pages/movies/[id].js와 일치합니다
  해당 URI 하위에 다시 nested route가 있는 형태는 [id]파일을 폴더로 만들고 위와 같은 방식을 적용하면 됩니다.
  /movies/1/actress => pages/movies/[id]/[idnext].js
  https://nextjs.org/docs/routing/dynamic-routes

- Catch all routes
  대괄호 안에 세 개의 점(...)을 추가하여 모든 경로를 포착하도록 Dynamic Routes를 확장할 수 있습니다. pages/movies/[...id].js는 /movies/1와 일치하지만 /movies/1/2, /movies/1/ab/cd 등과도 일치합니다. 일치하는 매개변수는 페이지에 쿼리 매개변수로 전송되며 항상 배열이므로 /movies/a 경로에는 다음 쿼리 개체가 있습니다.
  ex) query: { "id": ["a"] }
  https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes

# 2.6 routing to Detail Page with Id & Title

한 컴포넌트에서 객체를 클릭하여 다른 컴포넌트로 라우팅 시키는 방식에는 두 가지 방식이 존재합니다.

1. Link를 사용해서 href={링크}를 사용하는 방식
2. 또는 div에 onclick 메소드를 걸어 함수 발생 시 router.push 하는 방식입니다.

- router.push(url, as, options)

클라이언트 측 전환을 처리합니다. 이 방법은 next/link가 충분하지 않은 경우에 유용합니다.
url: UrlObject | pathName:string, query:object
as: UrlObject | String: 브라우저 URL 표시줄에 표시될 경로. URL 마스킹할 때 사용합니다.

```
router.push({
pathname: '/post/[pid]',
query: { postname: post.name },
})
```

[참고] 외부 URL에 대해서는 router.push()를 사용할 필요가 없습니다.
window.location을 사용하는 것이 더 적합합니다.
https://nextjs.org/docs/api-reference/next/router#routerpush

# 2.7 Catch ALL URL

- getServerSideProps |
  페이지에서 getServerSideProps(서버 측 렌더링)라는 함수를 export하는 경우 Next.js는 서버에서 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render한 후, 클라이언트단에서 나머지 js를 처리합니다. >> 2.3 참고
  https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

- getServerSideProps (Context parameter) |
  params: 부모 컴포넌트가 dynamic route(동적 경로)를 사용하는 경우 (ex. Link, router.push... ) 자식 컴포넌트의 getSerSideProps params에 route parameter가 포함됩니다. 페이지 이름이 [id].js이면 params는 { id: ... }처럼 보일 것입니다.
  query: 쿼리 문자열을 나타내는 객체입니다. 파일설정을 [...id].js 식으로 지정했다면 모든 URL 요소에 대해 배열 형태로 catch할 수 있습니다.
  https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter

- getServerSideProps (TypeScript Ver.)

```
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  return {
    props: {
      context.params.params;
      //... and so on
    }
  }
}

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return "something"
}
```

https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-with-typescript

- 클라이언트 사이드 렌더링 시 router.query.params 타입 지정 (Typescript Ver)

```
type MovieDetailParams = [string, string] | [];

const router: NextRouter = useRouter();
const [title, id] = (router.query.params || []) as MovieDetailParams;
```
