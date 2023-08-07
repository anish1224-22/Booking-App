import hotel from "../models/hotel.js";
import room from "../models/Room.js"
export const createHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel is deleted");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    res.status(200).json(Hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const query = {};

    const allowedParams = ['featured', 'min', 'max', 'city']; // List of allowed query parameters

    // Iterate over the query parameters and build the query object
    for (const param in req.query) {
      if (allowedParams.includes(param)) {
        if (param === 'min' || param === 'max') {
          if (!query.cheapestPrice) {
            query.cheapestPrice = {};
          }

          query.cheapestPrice[`$${param === 'min' ? 'gte' : 'lte'}`] = parseInt(req.query[param]);
        } else {
          query[param] = req.query[param];
        }
      }
    }

    const limit = parseInt(req.query.limit);

    const hotels = await hotel.find(query).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};





export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(cities.map(city=>{
      return hotel.countDocuments({city:city})
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({type:"hotel"});
    const apartmentCount = await hotel.countDocuments({type:"apartment"});
    const resortCount = await hotel.countDocuments({type:"resort"});
    const villaCount = await hotel.countDocuments({type:"villa"});
    const cabinCount = await hotel.countDocuments({type:"cabin"});
    res.status(200).json([
      {type:"hotel", count:hotelCount},
      {type:"apartment", count:apartmentCount},
      {type:"resort", count:resortCount},
      {type:"villa", count:villaCount},
      {type:"cabin", count:cabinCount},
    ])
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req,res,next)=>{
  try {
    const Hotel = await hotel.findById(req.params.id);
    const list = await Promise.all(
      Hotel.rooms.map((rom)=>{
        return room.findById(rom)
      })
    );
      res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}