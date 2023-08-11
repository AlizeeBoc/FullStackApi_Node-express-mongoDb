//4.

import express from "express"
const router = express()
import Player from "../models/Player.mjs"

// GET players
router.get("/", async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch (err) {
       res.json({  message : err})
    }
})

//// GET specific player by id
//router.get("/:id", async (req, res) => {
//    const playerId = req.params.id
//    try {
//        const player = await Player.find({playerId : playerId})
//        res.json(player)
//        //res.render("index")
//    } catch (err) {
//        res.json ({ message : err})
//    }
//})

router.get("/,", (req, res) => {
    res.render('index')
})


// POST => create a new player
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


// DELETE => delete a specific player 
router.delete('/:id', async (req, res) => {
    const playerId = req.params.id
    console.log(playerId)
    try {
        const removedPlayer = await Player.deleteOne({playerId : playerId})
       res.json(removedPlayer)
    } catch (err) {
        res.json({ message : err })
    }
})

// UPDATE => update a specific player

router.patch('/:id', async (req, res) => {
    const playerId = req.params.id
    const newName = req.body.name
    try {
        const updatedPlayer = await Player.updateOne({playerId : playerId}, {$set : {name : newName}})
        res.json(updatedPlayer)
    } catch (err) {
        res.json({ message : err })
    }
})


export default router