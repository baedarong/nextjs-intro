import Seo from "../components/Seo";
import { useState, useEffect } from "react";

// export 필수, 함수명 getServerSideProps 이름 필수, return Object & props key 필수
// 서버, 즉 백엔드에서만 해당 코드를 pre-runninng 하며 접근가능하며 시인가능하다.
// server-side를 통해 props를 page로 전송 가능!
// 데이터가 유효할 때 화면이 보이지게 된다. --> loading 같은거 이제 사용 안함
export async function getServerSideProps() {
  const {results} = await (
    await fetch(
      `http://localhost:3000/api/movies`
    )
  ).json();

  return {
    props: {
      results,
    }
  }
} 

export default function Home({results}) {
    return (
        <div className="container"> 
            <Seo title="Home" />
            {!results && <h4> loading.. </h4>}
            {results?.map((movie) => 
            <div key={movie.id} className="movie">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                <h4>{movie.title}</h4>
            </div>)}
            <style jsx>{`
              .container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              padding: 20px;
              gap: 20px;
              }
              .movie img {
              max-width: 100%;
              cursor: pointer;
              border-radius: 12px;
              transition: transform 0.2s ease-in-out;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
              }
              .movie:hover img {
              transform: scale(1.05) translateY(-10px);
              }
              .movie h4 {
              font-size: 18px;
              text-align: center;
              }
            `}</style>
        </div>
    );
}