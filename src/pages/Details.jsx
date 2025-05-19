import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const data = await response.json();
        setData(data.result.properties);
      } catch (error) {
        console.error(`Error fetching ${type} details:`, error);
      }
    };

    fetchDetails();
  }, [type, id]);

  return (
    <div className="container">
      {data ? (
        <Card>
          <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`} />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {data.description || "No description available"}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
