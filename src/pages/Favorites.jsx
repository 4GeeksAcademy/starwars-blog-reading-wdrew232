import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { state, dispatch } = useStarWarsContext();

  const { favorites } = state;

  if (favorites.length === 0) {
    return <div className="container"><h2>Favorites</h2><p>No favorites yet.</p></div>;
  }

  return (
    <div className="container">
      <h2>Your Favorites</h2>
      <div className="row">
        {favorites.map((fav) => (
          <div className="col-md-4 mb-4" key={`${fav.type}-${fav.id}`}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://starwars-visualguide.com/assets/img/${fav.type}/${fav.id}.jpg`}
                onError={(e) =>
                  (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
                }
              />
              <Card.Body>
                <Card.Title>{fav.name || "Unnamed Item"}</Card.Title>
                <p className="text-capitalize">{fav.type}</p>
                <Button
                  as={Link}
                  to={`/details/${fav.type}/${fav.id}`}
                  variant="info"
                  className="me-2"
                >
                  View Details
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_FAVORITE",
                      payload: {
                        id: fav.id,
                        name: fav.name,
                        type: fav.type,
                      },
                    })
                  }
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
