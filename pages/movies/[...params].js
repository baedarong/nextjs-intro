// routing to /movies/123123

import { useRouter } from "next/router"
import Seo from "../../components/Seo";

// context, 즉 컴포넌트 전환에 따른 server-side props를 가져오는 getServerSideProps
export async function getServerSideProps({params:{params}}) {
    const movieId = params[1];
    const movieDetail  = await (
        await fetch(`http://localhost:3000/api/movies/${movieId}`)
      ).json()
    return {
        props: {
            movieDetail,
        }
    }
}
export default function Detail ({movieDetail}) {
    return <div className="container"> 
        <Seo title={movieDetail.title}></Seo>
        <h1> {movieDetail.title}</h1>
        <img className="movieDetail" src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} />
        <h4> [Production Companies] {movieDetail.production_companies.map((gen)=><div key={gen.id}> {gen.name}</div>)} </h4>
        <h3> [Description] <div>{movieDetail.overview}</div></h3>
        <style jsx>{`
        .movieDetail {
          max-width: 70%;
          cursor: pointer;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movieDetail:hover {
          transform: scale(1.05) translateY(-10px);
        }
        `}</style>
        </div>
}

// 익명으로 유저가 접근할 경우 router가 찍히지 않기 때문에 loading이 필요하다.
// NextJs에 변수를 포함하는 DynamicURL을 알려주는 방법은 [] 사용이다. 