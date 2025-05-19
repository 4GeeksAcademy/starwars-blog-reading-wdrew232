import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";

const Planets = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container">
      <h2>Planets</h2>
      <div className="row">
        {state.planets.map((planets) => (
          <div className="col-md-4" key={planets.uid}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${planets.uid}.jpg`} />
              <Card.Body>
                <Card.Title>{planets.name}</Card.Title>
                <Button variant="primary" onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { id: planets.uid, type: "planets" } })}>
                  {state.favorites.some((fav) => fav.id === planets.uid) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
