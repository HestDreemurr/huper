const multer = require("multer")
const { randomBytes } = require("node:crypto")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".")[1]
    
    const fileID = randomBytes(12).toString("hex")
    
    cb(null, `${fileID}.${fileExtension}`)
  }
})

const upload = multer({ storage })

module.exports = upload