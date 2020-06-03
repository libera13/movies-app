import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Button, Row, Spin } from "antd";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../../commons/GridCards";

const MovieDetailPage = (props) => {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const [Casts, setCasts] = useState([])

  const movieId = props.match.params.movieId;
  useEffect(() => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetchCrew(endpointCrew);
      })
      .catch((error) => console.error("Error: ", error));
  };
  const fetchCrew = (endpointCrew) => {
    fetch(endpointCrew)
      .then((result) => result.json())
      .then((result) => {
        setCasts(result);
        setLoadingForCasts(false)
      })
      .catch((error) => console.error("Error: ", error));
  };

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
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
      ) : <Spin/>}
      {/*Dodaj do ulubionych*/}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button>Dodaj do ulubionych</button>
      </div>
      {/*Movie info table*/}
      <MovieInfo movie={Movie} />
      {/*Pokaz aktorow*/}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={toggleActorView}>Pokaż aktorów</Button>
      </div>
      {/*Grid Cards for Crews*/}
      {ActorToggle && (
        <Row gutter={[16, 16]}>
          {!LoadingForCasts ? (
            Casts.map(
              (cast, index) =>
                cast.profile_path && (
                  <GridCards
                    actor
                    image={cast.profile_path}
                    characterName={cast.characterName}
                  />
                )
            )
          ) : (
            <div>loading...</div>
          )}
        </Row>
      )}
      <br />
    </div>
  );
};

export default MovieDetailPage;
