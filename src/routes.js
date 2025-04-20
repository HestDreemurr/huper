const { Router } = require("express")
const upload = require("./lib/multer.js")
const { randomBytes } = require("node:crypto")

const { uploadFile, getPublicUrl } = require("./lib/supabase.js")

const router = Router()

router.post("/upload", upload.single("avatar"), async (req, res) => {
  if (!req.file) return res.status(400).json({
    ok: false,
    message: "Nenhuma imagem foi enviada."
  })
  
  const fileExtension = req.file.originalname.split(".")[1]
  const fileID = randomBytes(12).toString("hex")
  req.file.name = `${fileID}.${fileExtension}`
  
  const error = await uploadFile(req.file)
  
  if (error) return res.status(500).json({
    ok: false,
    message: "Erro ao fazer upload da imagem."
  })
  
  const publicUrl = getPublicUrl(req.file.name)
  
  return res.status(200).json({
    ok: true,
    publicUrl
  })
})

module.exports = router