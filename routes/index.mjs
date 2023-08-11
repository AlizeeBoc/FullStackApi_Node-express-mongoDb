import express from "express"
const router = express()

router.get("/", (req, res) => {
  //res.send('hello')
  res.render("index")
})

//import playerRouter from "./players.mjs"

//router.use('/players', playerRouter)

export default router
