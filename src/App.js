import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header/Header";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  console.log(featuredData);
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //top movie
      let originals = list.filter(i => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let choosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(choosenInfo);
    };
    loadAll();
  }, []);
  useEffect(() => {
    const scrollListner = () => {
      if (window.screenY > 0) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListner);
    return () => {
      window.removeEventListener("scroll", scrollListner);
    };
  }, []);
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif"
            alt="loading"
          ></img>
        </div>
      )}
    </div>
  );
}

export default App;
