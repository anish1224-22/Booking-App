import Room from "../models/Room.js";
import hotel from "../models/hotel.js";
export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try {
           await hotel.findByIdAndUpdate(hotelId,
            {$push :{rooms: savedRoom._id}
           });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom  = async(req, res, next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedRoom);
      } catch (error) {
        next(error)
      }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const dates = req.body.dates;

    // Perform validation if necessary, e.g., check if room ID is valid

    const result = await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": dates,
        },
      }
    );

    if (result.nModified === 0) {
      // If no rooms were modified, it means the room ID was not found
      return res.status(404).json("Room not found");
    }

    res.status(200).json("Room status has been updated");
  } catch (error) {
    // Pass the error to the next error handling middleware
    next(error);
  }
};



export const deleteRoom = async (req, res, next) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        const hotelId = req.params.hotelId;
        await hotel.findByIdAndUpdate(hotelId, {
          $pull:{rooms: req.params.id}
        })
      } catch (error) {
        next(error)
      }
      res.status(200).json("Room is deleted");
    } catch (error) {
      next(error)
    }
}

export const getRoom = async (req, res, next) => {
    try {
      const Room = await Room.findById(req.params.id);
      res.status(200).json(Room);
    } catch (error) {
      next(error)
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
      const Rooms = await Room.find();
      res.status(200).json(Rooms);
    } catch (error) {
      next(error);
    }
  }