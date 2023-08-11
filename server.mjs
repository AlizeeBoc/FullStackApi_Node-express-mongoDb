import express from "express"
const app = express()

import dotenv from "dotenv"
dotenv.config()
import expressLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"


import indexRouter from "./routes/index.mjs"
import playerRouter from "./routes/players.mjs"

app.set('view engine', 'ejs')
app.set("views", "/home/alizee/testApiDb" + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))

////Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json()) // plus facile pour les requetes post

app.use("/", indexRouter)
app.use("/players", playerRouter)

////2. Routes de base
//app.get("/", (req, res) => {
//  res.send("We are on home")
//})

//3. Connexion a l'atlas
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas connected!")
  })
  .catch((err) => {
    console.log(err)
  })

// 1. Create a server
app.listen(process.env.PORT || 3000)

/*

npm init -y
npm install express
npm install --save-dev nodemon
npm install mongoose
npm install dotenv
npm install body-parser   
npm install cors
npm install --save-dev @types/cors

npm i ejs express-ejs-layouts


*/

////////////////: BIBLIO ////////////////////
// BACKEND : https://www.youtube.com/watch?v=vjf774RKrLc
// FRONT : https://www.youtube.com/watch?v=qj2oDkvc4dQ&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=5

////////////////////////////////////////////
// __dirname in ECMAS : https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
//import path from 'path';
//import url from 'url';

//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//console.log(__filename);
//console.log(__dirname);
