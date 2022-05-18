import Layout from "../components/Layout" 
import '../styles/globals.css'

// _app.js ==> base template.
export default function App ({Component, pageProps}) {
    return (
        <Layout>
            {/* 이 밑에 적히는 컴포넌트들이 모두 Layout의 props, children으로 들어갈 것이다 */}
            <Component {...pageProps}/>
        </Layout>
        )
}


