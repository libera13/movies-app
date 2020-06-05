import React from "react";
import GridCardsActors from "./Sections/GridCardsActors";
import GridCardsCrew from "./Sections/GridCardsCrew";
import GridCardsMovies from "./Sections/GridCardsMovies";

function GridCards(props) {
  let {
    actor,
    key,
    image,
    movieId,
    movieName,
    character,
    name,
    crew,
    job,
  } = props;
  const POSTER_SIZE = "w154";

  if (actor) {
    // FOR ACTORS
    return (
      <GridCardsActors
        key={key}
        character={character}
        POSTER_SIZE={POSTER_SIZE}
        image={image}
        name={name}
      />
    );
  } else if (crew) {
    // FOR CREW
    return (
      <GridCardsCrew
        key={key}
        character={character}
        POSTER_SIZE={POSTER_SIZE}
        image={image}
        name={name}
        job={job}
      />
    );
  } else {
    // FOR LANDING PAGE
    return (
      <GridCardsMovies
        key={key}
        movieId={movieId}
        movieName={movieName}
        image={image}
      />
    );
  }
}

export default GridCards;
