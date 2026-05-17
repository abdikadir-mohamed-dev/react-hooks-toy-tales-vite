import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {
  const toyCards = toys.map((toy) => (
    <ToyCard
      key={toy.id}
      toy={toy}
      toys={toys}
      setToys={setToys}
    />
  ))
  return (
    <div id="toy-collection">
      {toyCards}
    </div>
  );
}

export default ToyContainer;
