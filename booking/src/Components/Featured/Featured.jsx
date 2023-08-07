import React from "react";
import "./Featured.css";
import useFetch from "../../Hooks/useFetch";
const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=kanpur,jaipur,delhi"
  );
  return (
    <div className="featured">
      {
        loading?("Please Wait, loading"):
        <>
          <div className="featuredItem">
            <img
              src="https://picsum.photos/800/600/?category=Dublin"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kanpur</h1>
              <h2>{data[0]}Properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://picsum.photos/800/600/?category=Vienna"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Jaipur</h1>
              <h2>{data[1]}Properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://picsum.photos/800/600/?category=Mexico"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]}Properties</h2>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Featured;
