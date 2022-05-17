import NavBar from "../components/NavBar"
import '../styles/globals.css'

// _app.js ==> base template.
export default function App ({Component, pageProps}) {
    return (
        <div>
            <NavBar/>
            <Component {...pageProps}/>
        </div>
        )
}


