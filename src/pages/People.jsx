import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const People = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container">
      <h2>Characters</h2>
      <div className="row">
        {state.people.map((person) => (
          <div className="col-md-4 mb-4" key={person.uid}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                // onError={(e) =>
                //   // (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
                // }
              />
              <Card.Body>
                <Card.Title>{person.name || "Unnamed Character"}</Card.Title>

                <Button
                  as={Link}
                  to={`/details/people/${person.uid}`}
                  variant="info"
                  className="me-2"
                >
                  View Details
                </Button>

                <Button
                  variant="primary"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_FAVORITE",
                      payload: {
                        id: person.uid,
                        name: person.name,
                        type: "people",
                      },
                    })
                  }
                >
                  {state.favorites.some(
                    (fav) => fav.id === person.uid && fav.type === "people"
                  )
                    ? `Remove ${person.name} from Favorites`
                    : `Add ${person.name} to Favorites`}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
