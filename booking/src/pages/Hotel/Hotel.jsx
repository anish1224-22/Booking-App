import React, { useContext, useState, useEffect } from "react";
import "./Hotel.css";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Footer from "../../Components/Footer/Footer";
import MailList from "../../Components/MailList/MailList";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import Reserve from "../../Components/Reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);
  const ms_per_day = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / ms_per_day);
    return diffDays;
  }

  const days = dates[0]?.endDate ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (dir) => {
    let newSlideNumber;
    if (dir === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    if (data) {
      setOpenModal(false);
    }
  }, [data]);

  return (
    <div>
    <div className={openModal?"dimHotel":"hotel"}>
      <Navbar />
      <Header type="list" />

      {loading ? (
        "Please wait, loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <CancelIcon className="close" onClick={() => setOpen(false)} />
              <ArrowCircleLeftIcon className="dir" onClick={() => handleMove("l")} />
              <div className="slideWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <ArrowCircleRightIcon className="dir" onClick={() => handleMove("r")} />
            </div>
          )}

          {!open && (
            <div className="hotelWrapper">
              <button id="btn" className="bookNow" onClick={handleClick}>
                Book Now!
              </button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <LocationOnIcon />
                <span>
                  {data.address}, {data.city}
                </span>
              </div>
              <span className="hotelDistance">
                Excellent location - {data.distance} from the circle
              </span>
              <span className="hotelPriceHighlight">
                Book a stay at {data.cheapestPrice} and get a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, index) => (
                  <div className="imgWrapper" key={index}>
                    <img
                      onClick={() => handleOpen(index)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Finland, this property has an excellent location
                    score of 9.5!
                  </span>
                  <h2>
                    <b>${options.rooms ? days * data.cheapestPrice * options.rooms : 0}</b>({days}{" "}
                    nights)
                  </h2>
                  <button id="btn" onClick={handleClick}>Book Now!</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <MailList />
      <Footer />
    </div>
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
