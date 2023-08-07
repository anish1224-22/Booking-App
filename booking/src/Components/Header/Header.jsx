import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FestivalIcon from "@mui/icons-material/Festival";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "./Header.css";
const Header = ({type}) => {
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(
      {
        adults: 1,
        children: 0,
        rooms: 1
      }
    );
  const [openOptions, setOpenOptions] = useState(false);
  const handleOption = (name,operation) =>{
    setOptions(prev=>{
      return {
        ...prev,[name]:operation==="i" ? options[name]+1: options[name]-1,
      };
    });
  };
  const navigate= useNavigate()
  const { user } = useContext(AuthContext)
  const {dispatch} = useContext(SearchContext)
  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels",{state:{destination:destination, dates:dates, options:options}})
  }
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <BedroomParentIcon
              style={{
                color: "orange",
                marginRight: ".5rem",
                marginLeft: "1rem",
              }}
            />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <AirplanemodeActiveIcon
              style={{ color: "orange", marginRight: ".5rem" }}
            />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <DirectionsCarIcon
              style={{ color: "orange", marginRight: ".5rem" }}
            />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <LocalTaxiIcon style={{ color: "orange", marginRight: ".5rem" }} />
            <span>Airport Taxis</span>
          </div>
          <div className="headerListItem">
            <FestivalIcon style={{ color: "orange", marginRight: ".5rem" }} />
            <span>Attractions</span>
          </div>
        </div>
        {type!=="list" && <><h1 className="headerTitle">Plan Your Stay with the best Discounts</h1>
        <p className="headerDesc">
          Get instant savings worth over 25% or more with a free ThanosBooks
          Discount
        </p>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <HotelIcon className="headerIcon" />
            <input
              className="headerSearchInput"
              type="text"
              placeholder="Where are you going?"
              onChange={e=>setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <CalendarMonthIcon className="headerIcon" />
            <span className="headerSearchText" onClick={()=>{setOpenDate(!openDate)}}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
            {openDate && <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
            />}
          </div>
          <div className="headerSearchItem">
            <WcIcon className="headerIcon" />
            <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adults} Adults . ${options.children} Children . ${options.rooms} Rooms`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button className="optionCounterButton"  onClick={()=>handleOption("adults","d")} disabled={options.adults<=1}>-</button>
                  <span className="optionCounterNumber">{options.adults}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("adults","i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" onClick={()=>handleOption("children","d")} disabled={options.children<=0}>-</button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                  </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Rooms</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" onClick={()=>handleOption("rooms","d")} disabled={options.rooms<=1}>-</button>
                  <span className="optionCounterNumber">{options.rooms}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("rooms","i")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSearchItem">
            <div className="headerSearchBtn" onClick={handleSearch}>Search</div>
          </div>
        </div></>}
      </div>
    </div>
  );
};

export default Header;
