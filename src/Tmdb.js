const API_KEY = "7f945f914277633f019081c00561f647";
const BASE_URL = "https://api.themoviedb.org/3";

const basicFetch = async endpoint => {
  const req = await fetch(`${BASE_URL}${endpoint}`);
  const json = await req.json();
  //console.log(req);
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=en-US&api_key=${API_KEY}`
        )
      },
      {
        slug: "trending",
        title: "Recomended Videos",
        items: await basicFetch(
          `/trending/all/day?api_key=${API_KEY}&language=en-US`
        )
      },
      {
        slug: "toprated",
        title: "Top Rated",
        items: await basicFetch(
          `/movie/top_rated?api_key=${API_KEY}&language=en-US`
        )
      },
      {
        slug: "action",
        title: "Action",
        items: await basicFetch(
          `/discover/movie?with_genre=28&language=en-US&api_key=${API_KEY}`
        )
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await basicFetch(
          `/discover/movie?with_genre=35&language=en-US&api_key=${API_KEY}`
        )
      }
      /* {
        slug: "terror",
        title: "Terror",
        iitems: await basicFetch(
          `/discover/movie?with_genre=27?api_key=${API_KEY}&language=en-US`
        )
      },
      {
        slug: "romance",
        title: "Romance",
        iitems: await basicFetch(
          `/discover/movie?with_genre=10479?api_key=${API_KEY}&language=en-US`
        )
      }*/
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};
    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?api_key=${API_KEY}&language=en-US`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?api_key=${API_KEY}&language=en-US`
          );
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  }
};
