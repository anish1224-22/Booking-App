import React from "react";
import "./SearchItem.css";
import { Link } from "react-router-dom";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from circle</span>
        <span className="siTaxiOp">Free Taxi</span>
        <span className="siSubtitle">Fully furnished Villa</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You may cancel later, so lock in this great offer today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes & fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SearchItem;
