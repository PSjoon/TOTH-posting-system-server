import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import { createArticle } from "./createArticle"
import { viewArticle } from "./viewArticle"
import cors from "cors"

const app = express()
dotenv.config({ path: "../.env" })
dotenv.config({})
app.use(cors())

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3334

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

createArticle(app)
viewArticle(app)

app.get("/", async (req, res) => {
  console.log("hello World")
  res.json("Hello World!")
})

try {
  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
  })
} catch (error) {
  console.log(error)
}

export default app
