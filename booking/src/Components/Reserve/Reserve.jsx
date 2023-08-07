import React, { useContext, useState } from "react";
import "./Reserve.css";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { SearchContext } from "../../Context/SearchContext";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate()
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const handleClose = () => {
    setOpen(false);
  };

  const isAvailable = (roomNumber) => {
    const isReserved = selectedRooms.some((room) => room.id === roomNumber._id);
    const isFound =
      roomNumber.unavailableDates.length > 0 &&
      roomNumber.unavailableDates.some((date) =>
        allDates.some(
          (selectedDate) => selectedDate.getTime() === new Date(date).getTime()
        )
      );
    return !isReserved && !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const isAlreadyReserved = selectedRooms.some((room) => room.id === value);

    if (checked && !isAlreadyReserved) {
      setSelectedRooms((prevSelectedRooms) => [
        ...prevSelectedRooms,
        { id: value, disabled: true },
      ]);
    } else if (!checked && isAlreadyReserved) {
      setSelectedRooms((prevSelectedRooms) =>
        prevSelectedRooms.filter((room) => room.id !== value)
      );
    }
  };

  const handleClick = async () => {
    try {
      const reservedRoomIds = selectedRooms.map((room) => room.id);

      await Promise.all(
        reservedRoomIds.map(async (roomId) => {
          const res = await axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          navigate('/');
          window.alert('Booking Successfull')
          return res.data;
        })
      );

      setSelectedRooms([]);
      console.log("Rooms reserved successfully!");
    } catch (error) {
      console.error("Failed to reserve rooms:", error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <CloseIcon id="head" className="rClose" onClick={handleClose} />
        <span id="head">Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item.id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber) => (
              <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
