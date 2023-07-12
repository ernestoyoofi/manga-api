const route = require("express").Router()
const komiku = require("../lib/komiku.id")

route.get("/recommend", async (req, res) => {
  try {
    const d = await komiku.Other_Recommend(req.query.page)

    return res.status(200).json({
      success: true,
      message: `Found about ${d.list.length} manga that can be read`,
      ...d
    })
  } catch(err) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
})

route.get("/search", async (req, res) => {
  if(typeof req.query.q != "string") {
    return res.status(200).json({
      success: false,
      message: `Please provide a word to search for manga`
    })
  }
  try {
    const d = await komiku.Manga_Search(req.query.q, req.query.page)

    return res.status(200).json({
      success: true,
      message: `Found about ${d.list.length} manga that can be read`,
      ...d
    })
  } catch(err) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
})

module.exports = route