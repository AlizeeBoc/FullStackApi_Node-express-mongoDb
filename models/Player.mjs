//5.

import mongoose from "mongoose";
//export const profilePictureBasePath = "uploads/playersPictures" //inside public folder

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
    playerImg : {
      type : String,
      //required : true
    },
    clubImg : {
      type : String,
      //required : true
<<<<<<< HEAD
    }
=======
    },
>>>>>>> fixPlayer
  })
  
  const Player = mongoose.model("players", playersSchema)
  
  export default Player
 