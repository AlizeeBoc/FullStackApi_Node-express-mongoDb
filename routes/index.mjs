import express from "express"
const router = express()

import playerRouter from "./players.mjs"

router.use('/players', playerRouter)