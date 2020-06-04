import React, { useEffect, useState } from "react";
import axios from "axios";
const Favorite = (props) => {
  const { userFrom, movieInfo, movieId } = props;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieInfo.original_title,
    movieImage: movieInfo.backdrop_path,
    movieRunTime: movieInfo.movieRunTime,
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Nie udało się pobrać numeru ulubionych");
      }
    });

    axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Nie udało się pobrać id ulubionych");
      }
    });
  }, []);

  const handleClickFavorite = () => {
    if (Favorited) {
    } else {

      axios.post("/api/favorite/addToFavorite")

    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={handleClickFavorite}>
        {Favorited ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        {FavoriteNumber}
      </button>
    </div>
  );
};

export default Favorite;
