// routing to /movies/123123

import { useRouter } from "next/router"
import Seo from "../../components/Seo";

// context, 즉 컴포넌트 전환에 따른 server-side props를 가져오는 getServerSideProps
export function getServerSideProps({params:{params}}) {
    return {
        props: {
            params,
        }
    }
}
export default function Detail ({params}) {
    const router = useRouter();
    const [title, id] = params || [];

    return <div> 
        <Seo title={title}></Seo>
        <h4> {title}</h4></div>
}

// 익명으로 유저가 접근할 경우 router가 찍히지 않기 때문에 loading이 필요하다.
// NextJs에 변수를 포함하는 DynamicURL을 알려주는 방법은 [] 사용이다. 