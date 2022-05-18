import NavBar from "./NavBar";


// children ==> reactJS 가 제공하는 prop
// 하나의 컴포넌트를 또 다른 컴포넌트 안에 넣을 떄 사용 가능하다.
export default function Layout({children}) {
    return (
        <>
        <NavBar/>
        <div>{children}</div>
        </>
    )

}