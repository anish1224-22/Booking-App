import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../../Hooks/useFetch";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import SearchItem from "../../Components/SearchItem/SearchItem";
import "./List.css";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label className="inputs">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label className="inputs" style={{ paddingTop: "1.4rem" }}>
                Check-in Date
              </label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(
                  date[0].startDate,
                  "dd/MM/yyyy"
                )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label style={{ paddingTop: "1.4rem" }}>Options</label>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price <small>per Night</small>
                </span>
                <input
                  type="number"
                  className="lsOptionInput"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price <small>per Night</small>
                </span>
                <input
                  type="number"
                  className="lsOptionInput"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adults</span>
                <input
                  type="number"
                  className="lsOptionInput"
                  value={options.adults}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      adults: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  className="lsOptionInput"
                  value={options.children}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      children: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Rooms</span>
                <input
                  type="number"
                  className="lsOptionInput"
                  value={options.rooms}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      room: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Please wait, loading..."
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
