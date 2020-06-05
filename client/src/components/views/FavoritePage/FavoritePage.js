import React, { useEffect, useState } from "react";
import {Container, StyledA, StyledTable, StyledTd, StyledTh} from "./style";
import axios from "axios";
import { Popover, Spin, Typography } from "antd";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";
import { useSelector } from "react-redux";
import { FiExternalLink } from "react-icons/fi";

const { Title } = Typography;

const FavoritePage = () => {
  const user = useSelector((state) => state.user);

  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios.post("/api/favorite/getFavoredMovie", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
        setLoading(false);
      } else {
        alert("Operacja pobierania ulubionych filmów nie powiodła się");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    axios
      .post("/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("Operacja usuwania nie powiodła się");
        }
      });
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.movieImage ? (
          <img
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.movieImage}`}
            alt={"zdjecie"}
          />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>
          {favorite.movieRunTime} min
        </td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Usuń
          </button>
          <StyledA href={`/movie/${favorite.movieId}`}>
            <button>Przejdź do filmu</button>
          </StyledA>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Moje ulubione filmy </Title>
      <hr />
      {user.userData && !user.userData.isAuth ? (
        <Container>
          <p>Nie jesteś zalogowany</p>
          <a href="/login">Przejdź do logowania</a>
        </Container>
      ) : Loading ? (
        <Spin />
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <StyledTd>Tytuł</StyledTd>
              <StyledTd>Czas trwania</StyledTd>
              <StyledTh>Usuń z ulubionych</StyledTh>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </StyledTable>
      )}
    </div>
  );
};
export default FavoritePage;
