//5.

import mongoose from "mongoose";
export const profilePictureBasePath = "uploads/playersPictures"

const playersSchema = new mongoose.Schema({
    playerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    overallRating: {
      type: String,
      required: true,
    },
    //profilePicture : {
    //  type : String,
    //  required : true
    //}
  })
  
  const Player = mongoose.model("players", playersSchema)
  
  export default Player
 