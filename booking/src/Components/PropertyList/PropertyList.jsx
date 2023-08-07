import React from "react";
import "./PropertyList.css";
import useFetch from "../../Hooks/useFetch.js";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
  const images = [
    "https://picsum.photos/800/600/?category=Hotels",
    "https://picsum.photos/800/600/?category=Apartments",
    "https://picsum.photos/800/600/?category=Resorts",
    "https://picsum.photos/800/600/?category=Villas",
    "https://picsum.photos/800/600/?category=Cabins",
  ];

  return (
    <div className="pList">
      {loading ? (
        "Please wait, loading..."
      ) : (
        <>
          {data &&
            data.map((item, i) => (
              <div className="pListItem" key={i}>
                <img src={images[i]} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{item.type}</h1>
                  <h2>
                    {item.count} {item.type}{item.count>1?"s":""}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
