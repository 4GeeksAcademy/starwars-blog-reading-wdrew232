import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";

const Vehicles = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container">
      <h2>Vehicles</h2>
      <div className="row">
        {state.vehicles.map((vehicles) => (
          <div className="col-md-4" key={vehicles.uid}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/Vehicles/${vehicles.uid}.jpg`} />
              <Card.Body>
                <Card.Title>{vehicles.name}</Card.Title>
                <Button variant="primary" onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { id: vehicles.uid, type: "vehicles" } })}>
                  {state.favorites.some((fav) => fav.id === vehicles.uid) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
