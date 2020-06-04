import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Button, Row, Spin } from "antd";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../../commons/GridCards";
import Favorite from "./Sections/Favorite";

const MovieDetailPage = (props) => {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const [CrewToggle, setCrewToggle] = useState(false);
  const [Casts, setCasts] = useState([]);

  const movieId = props.match.params.movieId;
  useEffect(() => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchMovie(endpoint);
  }, []);

  const fetchMovie = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);
        const endpointCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetchCasts(endpointCasts);
      })
      .catch((error) => console.error("Error: ", error));
  };
  const fetchCasts = (endpointCrew) => {
    fetch(endpointCrew)
      .then((result) => result.json())
      .then((result) => {
        setCasts(result.cast);
        setCrews(result.crew);
        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error: ", error));
  };

  const toggleActorView = () => {
    setCrewToggle(false);

    setActorToggle(!ActorToggle);
  };
  const toggleCrewView = () => {
    setActorToggle(false);
    setCrewToggle(!CrewToggle);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* MainImage*/}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <Spin />
      )}
      {/*Dodaj do ulubionych*/}
      <Favorite
        userFrom={localStorage.getItem("userId")}
        movieId={movieId}
        movieInfo={Movie}
      />
      {/*Movie info table*/}
      <MovieInfo movie={Movie} />
      {/*Pokaz aktorow i obsade*/}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={toggleActorView}>Pokaż aktorów</Button>
        <Button onClick={toggleCrewView}>Pokaż obsade</Button>
      </div>
      {/*Grid Cards for Casts*/}
      {ActorToggle && (
        <Row gutter={[16, 16]}>
          {!LoadingForCasts ? (
            Casts.map(
              (cast, index) =>
                cast.profile_path && (
                  <GridCards
                    actor
                    image={cast.profile_path}
                    character={cast.character}
                    name={cast.name}
                  />
                )
            )
          ) : (
            <Spin />
          )}
        </Row>
      )}

      {/*Grid Cards for Casts*/}
      {CrewToggle && (
        <Row gutter={[16, 16]}>
          {!LoadingForCasts ? (
            Crews.map(
              (crew, index) =>
                crew.profile_path && (
                  <GridCards
                    crew
                    image={crew.profile_path}
                    job={crew.job}
                    name={crew.name}
                  />
                )
            )
          ) : (
            <Spin />
          )}
        </Row>
      )}
      <br />
    </div>
  );
};

export default MovieDetailPage;
