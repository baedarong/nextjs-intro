const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects(){ // URL changed!
    return [
      {
        source:"/old-blog/:path*", // FROM
        destination:"/new-blog/:path*",  // To
        permanent: false, // Brower knows?
      }
    ]
  },
  async rewrites(){ // URL doesn't changed!
    return [
      {
        source:"/api/movies",
        destination:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      }
    ]
  }
}

