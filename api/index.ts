import dotenv from "dotenv"
import express from "express"

const app = express()
dotenv.config({ path: ".env" })
dotenv.config({})
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3334

app.get("/", async (req, res) => {
  console.log("hello World")
  res.json(`Hello World in port ${port}`)
})

try {
  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
  })
} catch (error) {
  console.log(error)
}
