// sera utilisé comme middleware donc nécéssité de retourner 1) une fonction 2) + next.
export const paginatedResults = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)  // !! parsInt sinon strings
    //  const limit = parseInt(req.query.limit)
    const limit = 10
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit 
  
      const results = {}
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        //console.log(res.paginatedResults)
        // => retourne l'objet result contenant l'objet previous/next et results cad les players
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }


  