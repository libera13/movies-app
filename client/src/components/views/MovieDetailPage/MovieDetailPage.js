import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";

const MovieDetailPage = () => {
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const movieId = this.props.match.params.movieId;
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
      }, setLoading(false))
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
        //  MainImage
        {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      {/*Movie info table*/}

    </div>
  );
};

export default MovieDetailPage;
