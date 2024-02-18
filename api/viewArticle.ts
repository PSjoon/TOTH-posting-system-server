import { Express } from "express"
import { prisma } from "./lib/prisma"

export async function viewArticle(app: Express) {
  app.get("/article", async (req, res) => {
    try {
      const artigos = await prisma.post.findMany({
        orderBy: {
          dateCreated: "desc",
        },
      })

      res.send({ artigos })
    } catch (error) {
      console.error("Erro ao buscar artigos:", error)
      res.status(500).json({ error: "Erro ao buscar artigos" })
    }
  })
}
