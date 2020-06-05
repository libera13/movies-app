import React from "react";
import {IMAGE_BASE_URL} from "../../Config";
import {Col, Typography} from "antd";

const { Text } = Typography;

const GridCardsCrew = (props) => {
  const { key, character, POSTER_SIZE, image, name, job } = props;
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
        <Text>
          {name} <br />
          {job}
        </Text>
      </div>
    </Col>
  );
};

export default GridCardsCrew;
