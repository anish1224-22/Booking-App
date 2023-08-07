import React from "react";
import "./FeaturedProperties.css";
import useFetch from "../../Hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/?featured=true");
  return (
    <div className="fp">
      {loading ? (
        "Please Wait, loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem">
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
