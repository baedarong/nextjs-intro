import Link from "next/link"
import { useRouter } from "next/router"
// Link:: NextJs 어플리케이션의 클라이언트 사이드 네비게이션을 제공해줍니다. 
import styles from "./NavBar.module.css"

export default function NavBar() {
    const router = useRouter(); // hook to Router
    return (
        <nav className={styles.nav}> 
            <Link href="/"><a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}> Home </a></Link>
            <Link href="/about"><a  className={[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")}>About </a></Link>
        </nav>
    )
}