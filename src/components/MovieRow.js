import React, { useState } from "react";
import "./MovieRow.css";
import { map } from "lodash";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const pips = items.results;

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };
  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow-right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150
          }}
        >
          {pips.map((pip, key) => (
            <div key={key} className="movieRow--item">
              <img
                src={`https://image.tmdb.org/t/p/w500${pip.poster_path}`}
                alt={pip.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieRow;
/*{item.results.map((itema, key) => (
    <>
      <h1>apps</h1>
      <img src="https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" />
    </>
  ))}*/
