import Link from "next/link"
import { useRouter } from "next/router"
// Link:: NextJs 어플리케이션의 클라이언트 사이드 네비게이션을 제공해줍니다. 

export default function NavBar() {
    const router = useRouter(); // hook to Router
    return (
        <nav> 
            <Link href="/"><a style={{color: router.pathname === "/" ? "red":"blue"}}> Home </a></Link>
            <Link href="/about"><a style={{color: router.pathname === "/about" ? "red":"blue"}}>About </a></Link>
        </nav>
    )
}