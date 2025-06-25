import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch ${type} details`);
        const result = await response.json();
        setData(result.result.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p>Error: {error}</p></div>;

  return (
    <div className="container">
      <Card className="mt-4">
        <Card.Img
          variant="top"
          src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
          }}
        />
        <Card.Body>
          <Card.Title className="text-capitalize">
            {data?.name || "Details"}
          </Card.Title>
          <hr />
          {data ? (
            <div>
              {Object.entries(data).map(([key, value]) => (
                <p key={key}>
                  <strong className="text-capitalize">{key.replace(/_/g, ' ')}:</strong> {value}
                </p>
              ))}
            </div>
          ) : (
            <p>No details available</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Details;
