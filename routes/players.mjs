//4.
/////// PROBLEME AVEC LES PHOTOS DE PROFIL https://www.youtube.com/watch?v=Zi2UwhpooF8&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=7 ///////////////

import express from "express"
const router = express()
import multer from "multer"
import path from "path"
import { profilePictureBasePath } from "../models/Player.mjs"
import Player from "../models/Player.mjs"
const uploadPath = path.join('public', profilePictureBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.imageMimeType) )
    }
})

const renderNewPage = async (res, player, hasError = false) => {
    try {
        const players = await Player.find({})
        const params = {
            players : players,
            player : player
        }
        if (hasError) params.errorMessage = 'error Creating Player'
        res.render('players/new', params)
    } catch {
        res.redirect('/players')
    }
}

// All players Route
router.get("/", async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i') // case insensitive
    } 
    try {
        const players = await Player.find(searchOptions) // !!! pas de '{}' !!!
        //res.json(players)
         res.render('players/index', { 
            players : players, 
            searchOptions : req.query 
        })
    } catch {
       res.redirect('/')
    }
})


// New player Route 
router.get('/new', (req, res) => {
 renderNewPage(res, new Player())
}) 




// POST => create a new player Route
router.post('/', upload.single('profilePicture'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const player = new Player({
        playerId : req.body.playerId,
        name : req.body.name,
        nationality : req.body.nationality,
        club : req.body.club,
        overallRating : req.body.overallRating,
        profilePicture : fileName,
    })
    try {
        const newPlayer = await player.save()
        //res.redirect(`players/$(newAuthor.id)`)
        res.redirect('players')
        console.log('A new player has been created!');
    } catch (err) {
        renderNewPage(res, player, true)
    } 
})





export default router
//////////////////////////////////////////////////////////////////////////


//// Get player by id Route // ok json
//router.get("/:id", async (req, res) => {
//    const playerId = req.params.id
//    try {
//        const player = await Player.find({playerId : playerId})
//        res.json(player)
//        //res.render("players/player")
//    } catch (err) {
//        res.json ({ message : err})
//    }
//})



//// POST => create a new player Route
//router.post('/', async (req, res) => {
//    const player = new Player({
//        //playerId : req.body.playerId,
//        name : req.body.name,
//        //nationality : req.body.nationality,
//        //club : req.body.club,
//        //overallRating : req.body.overallRating
//    })
//    try {
//        //const playerSaved = await player.save()
//        //res.json(playerSaved)
//        res.send(req.body.name)
//        console.log('A new player has been created!');
//    } catch (err) {
//        res.json({ message : err})
//    }
//})

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


