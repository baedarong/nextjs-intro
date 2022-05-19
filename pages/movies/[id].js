// routing to /movies/123123

import { useRouter } from "next/router"

export default function Detail () {
    const router = useRouter();
    console.log(router);
    return <div> <h4> {router.query.title || "Loading..."}</h4></div>
}

// 익명으로 유저가 접근할 경우 router가 찍히지 않기 때문에 loading이 필요하다.
// NextJs에 변수를 포함하는 DynamicURL을 알려주는 방법은 [] 사용이다. 