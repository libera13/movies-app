import React from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import { IMAGE_BASE_URL } from "../Config";

const { Text } = Typography;
function GridCards(props) {
  let { actor, key, image, movieId, movieName, character, name } = props;
  const POSTER_SIZE = "w154";

  if (actor) {
    return (
      <Col key={key} lg={6} md={8} xs={24} align="center">
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt={character}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
          />
        </div>
        <div>
            <Text> {character} <br/>
            as {name} </Text>
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt={movieName}
              src={image}
            />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCards;
