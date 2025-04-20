require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

const projectUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(
  projectUrl,
  serviceRoleKey
)

async function uploadFile(file) {
  const { error } = await supabase.storage.from("avatars").upload(`uploads/${file.name}`, file.buffer, {
    contentType: file.mimetype,
    upsert: false
  })
  
  return error
}

function getPublicUrl(fileID) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(`uploads/${fileID}`)
  return data.publicUrl
}

module.exports = { uploadFile, getPublicUrl }