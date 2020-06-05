import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { AiOutlineHeart } from "react-icons/ai";

const Favorite = (props) => {
  const { userFrom, movieInfo, movieId } = props;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieInfo.original_title,
    movieImage: movieInfo.backdrop_path,
    movieRunTime: movieInfo.runtime,
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
      // when added
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Nie udało się usunąć z ulubionych");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Nie udało się dodać do ulubionych");
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={handleClickFavorite}>
        <AiOutlineHeart />
        {FavoriteNumber}
        {Favorited ? "  Usuń" : "  Dodaj"}
      </Button>
    </div>
  );
};

export default Favorite;
