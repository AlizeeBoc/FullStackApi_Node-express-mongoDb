import express from "express"
const app = express()
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import router from "./routes/players.mjs"
import bodyParser from "body-parser"

app.use(bodyParser.json()) // plus facile pour les requetes post

////Middlewares
//app.use(auth)
//app.use('/posts', () => {
//    console.log("This is a middleware running");
//})

app.use('/posts', router)


//2. Routes de base
app.get("/", (req, res) => {
    res.send("We are on home")
})

//3. Connexion a l'atlas 
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('MongoDB Atlas connected!')
}).catch(err => {
console.log(err);
})

// 1. Create a server
app.listen(3000)





////////////////: BIBLIO ////////////////////
// https://www.youtube.com/watch?v=vjf774RKrLc