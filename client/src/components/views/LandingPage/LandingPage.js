import React, { useEffect, useState } from "react";
import { Typography, Row } from "antd";

import { FaCode } from "react-icons/fa";
import {
  API_KEY,
  API_URL,
  IMAGE_SIZE,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../../commons/GridCards";

const { Title } = Typography;
function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page);
        console.log(result);
      }, setLoading(false))
      .catch((error) => console.error("Error: ", error));
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}> Najnowsze popularne filmy </Title>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>

        {loadMoreItems && <div>ładowanie...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="loadMore" onClick={loadMoreItems}>
            Więcej
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
