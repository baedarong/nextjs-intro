import Link from "next/link"
import { useRouter } from "next/router"
// Link:: NextJs 어플리케이션의 클라이언트 사이드 네비게이션을 제공해줍니다. 

export default function NavBar() {
    const router = useRouter(); // hook to Router
    return (
        <nav> 
            <Link href="/"><a className={router.pathname === '/' ? "active" : ""}> Home </a></Link>
            <Link href="/about"><a className={router.pathname === '/about' ? "active" : ""}> About </a></Link>
            <style jsx> {`
            nav { //tag name
                background-color:white;
            } 
            a {
                text-decoration:none; 
            }
            .active { //className
                color:red;
                font-weight:bold;
            }
            `} </style>
        </nav>
    )
}