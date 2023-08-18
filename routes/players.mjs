//4.
/////// PROBLEME pour creer un nouveau joueur => photo de profil -_-

import express from "express"
const router = express()
import { paginatedResults } from "../middleware/paginate.mjs"
//import multer from "multer"
//import path from "path"
//import { profilePictureBasePath } from "../models/Player.mjs"
import Player from "../models/Player.mjs"
//const uploadPath = path.join('public', profilePictureBasePath)
//const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
//const upload = multer({
//    dest: uploadPath,
//    fileFilter: (req, file, callback) => {
//        callback(null, imageMimeTypes.includes(file.mimetype) )
//    }
//})

const renderNewPage = async (res, player, hasError = false) => {
  try {
    const players = await Player.find({})
    const params = {
      players: players,
      player: player,
    }
    if (hasError) params.errorMessage = "error Creating Player"
    res.render("players/new", params)
  } catch {
    res.redirect("/players")
  }
}


router.get("/", paginatedResults(Player), async (req, res) => {
  //res.json(res.paginatedResults) // ok
  
  const currentPage = parseInt(req.query.page) || 1; 
  const currentPageUrl = `${req.baseUrl}?page=${currentPage}`;
  console.log(currentPageUrl);

  let searchOptions = {}
  
  try {
    if (req.query.name != null && req.query.name !== "") {
      searchOptions.name = new RegExp(req.query.name, "i") // case insensitive
       const players = await Player.find(searchOptions) // !!! pas de '{}' !!!
       res.render("players/player", {
        players: players,
        searchOptions: req.query,
      })
    } else {
      //const players = await Player.find(searchOptions) // !!! pas de '{}' !!!
    const players = res.paginatedResults.results
    const previousPage = res.paginatedResults.previous; 
    const nextPage = res.paginatedResults.next;
    //res.json(previousPage)// ok
    
    if (!req.query.page) {
      return res.redirect(`/players?page=1`);
    } 
    
    res.render("players/index", {
      players: players,
      searchOptions: req.query,
      previousPage: previousPage, 
      nextPage: nextPage,
      currentPageUrl: currentPageUrl,
    })
    }
  } catch (err) {
    console.log('error')
    //res.redirect("/")
  }
})



// New player Route
router.get("/new", (req, res) => {
  renderNewPage(res, new Player())
})

// POST => create a new player Route
//router.post('/', upload.single('profilePicture'), async (req, res) => {
router.post("/", async (req, res) => {
//  const fileName = req.file != null ? req.file.filename : null
  const player = new Player({
    playerId: req.body.playerId,
    name: req.body.name,
    nationality: req.body.nationality,
    club: req.body.club,
    overallRating: req.body.overallRating,
    //profilePicture: fileName,
    playerImg: req.body.playerImg,
  })
  try {
    const newPlayer = await player.save()
    //res.redirect(`players/$(newPlayer.id)`)
    res.redirect("players")
    console.log("A new player has been created!")
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
router.delete("/:id", async (req, res) => {
  const playerId = req.params.id
  console.log(playerId)
  try {
    const removedPlayer = await Player.deleteOne({ playerId: playerId })
    res.json(removedPlayer)
  } catch (err) {
    res.json({ message: err })
  }
})

// UPDATE => update a specific player

router.patch("/:id", async (req, res) => {
  const playerId = req.params.id
  const newName = req.body.name
  try {
    const updatedPlayer = await Player.updateOne(
      { playerId: playerId },
      { $set: { name: newName } }
    )
    res.json(updatedPlayer)
  } catch (err) {
    res.json({ message: err })
  }
})
