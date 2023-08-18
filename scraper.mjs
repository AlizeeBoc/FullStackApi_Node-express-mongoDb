import dotenv from "dotenv"
dotenv.config()

// le scrapper devra etre modifié (l'uri ayant été modifiée entre temps)


import { MongoClient } from "mongodb"
import axios from "axios"
import cheerio from "cheerio" // parsing the response

const connectAndScrap = async () => {
  const password = process.env.PASSWORD_DB
  const client = new MongoClient(`mongodb+srv://becode_21:${password}@cluster0.76tefbp.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    const collection = client.db("fifaStat").collection("players")
    const players_datas = []
    

    for (let i = 1; i < 606; i++) {
      const response = await axios.get(
        "https://www.fifaindex.com/players/?page=" + i
      )

      const $ = cheerio.load(response.data)

      $("tbody > tr[data-playerid]").each((i, element) => {
        //td[data-title="Name"] > a : pour accéder a l'enfant direct
        const playerId = $(element)[0].attribs["data-playerid"]
        // parsInt?
        const name = $(element).find('td[data-title="Name"] > a').text()
        const nationality = $(element)
          .find('td[data-title="Nationality"] > a')
          .attr("title")
        const club = $(element).find('td[data-title="Team"] > a').attr("title")
        const overallRating = $(element)
          .find('td[data-title="OVR / POT"] > span:nth-child(1)')
          .text()
        const playerImg = $(element).find("td img").attr("src")
        //td[data-title="Nationality"] img : pour accéder à l'un des enfants
        const flagImg = $(element)
          .find('td[data-title="Nationality"] img')
          .attr("src")
        const clubImg = $(element).find('td[data-title="Team"] img').attr("src")
        players_datas.push(
          collection.insertOne({
            playerId,
            name,
            nationality,
            club,
            overallRating,
            playerImg,
            flagImg,
            clubImg,
          })
        )
      })
    }

    await Promise.all(players_datas)
    console.log("Data insertion completed.")

    const docs = await collection.find({}).toArray()
    console.log(`Found ${docs.length} documents in the collection`)
    console.log(docs)
  } catch (error) {
    console.error("An error occurred:", error)
  } finally {
    await client.close()
  }
}

connectAndScrap()