export const paginatedResults = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)  // !! parsInt sinon strings
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit  // puisque exclu dans slice()
  
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
        // objet results contenant lui-même un objet results contenant le tableau d'objets "player" 
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        // => retourne l'objet result contenant l'objet previous/next et results cad les players
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

  // https://www.youtube.com/watch?v=ZX3qt0UWifc
  