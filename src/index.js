const express = require("express")
const path = require("node:path")

const upload = require("./lib/multer.js")

const app = express()

app.post("/image/upload", upload.single("image"), (req, res) => {
  console.log(req.body.image)
  return res.json({ imageCode: req.file.filename })
})

app.get("/image/get/:code", (req, res) => {
  try {
    const imageCode = req.params.code
    
    const imagePath = path.join(__dirname, `../uploads/${imageCode}`)
    
    return res.sendFile(imagePath)
  } catch {
    return res.status(404).json({ message: "image_not_found" })
  }
})


app.listen(3333, () => {
  console.log("A API Huper está on-line!")
})