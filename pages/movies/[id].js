// routing to /movies/123123

import { useRouter } from "next/router"

export default function Detail () {
    const router = useRouter();
    console.log(router);
    return "detail Here"
}

// NextJs에 변수를 포함하는 DynamicURL을 알려주는 방법은 [] 사용이다. 