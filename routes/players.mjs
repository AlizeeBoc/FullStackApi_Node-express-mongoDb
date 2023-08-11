//4.

import express from "express"
const router = express()
import Player from "../models/Post.mjs"


router.get("/", (req, res) => {
    res.send("We are on posts")
})

router.get("/specificPost", (req, res) => {
    res.send("We are on specificPost")
})

router.post('/', async (req, res) => {
    const player = new Player({
        playerId : req.body.playerId,
        name : req.body.name,
        nationality : req.body.nationality,
        club : req.body.club,
        overallRating : req.body.overallRating
    })
    try {
        const playerSaved = await player.save()
        res.json(playerSaved)
        console.log('A new player has been created!');
    } catch (err) {
        res.json({ message : err})
    }
})

export default router