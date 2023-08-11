//5.

import mongoose from "mongoose";

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
  })
  
  const Player = mongoose.model("players", playersSchema)
  
  export default Player