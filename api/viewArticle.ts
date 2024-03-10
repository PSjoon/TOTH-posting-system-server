import { Express } from 'express'
import { prisma } from './lib/prisma'

export async function viewArticle(app: Express) {
  // app.get("/article", async (req, res) => {
  //   try {
  //     const artigos = await prisma.artigo.findMany({
  //       orderBy: {
  //         dateCreated: "desc",
  //       },
  //     })

  //     res.send({ artigos })
  //   } catch (error) {
  //     console.error("Erro ao buscar artigos:", error)
  //     res.status(500).json({ error: "Erro ao buscar artigos" })
  //   }
  // })

  app.get('/article', async (req, res) => {
    try {
      const artigo = await prisma.artigo.findMany({
        orderBy: {
          dateCreated: 'desc',
        },
      })

      const artigoData = await Promise.all(
        artigo.map(async (artigo) => {
          const usuario = await prisma.usuario.findUnique({
            where: {
              id: artigo.by,
            },
          })

          return {
            id: artigo.id,
            dateCreated: artigo.dateCreated,
            photo: artigo.photo,
            reaction: artigo.reaction,
            text: artigo.text,
            title: artigo.title,
            by: artigo.by,
            file: artigo.file,

            profilePictures: usuario?.profilePictures,
            username: usuario?.username,
            college: usuario?.college,
            email: usuario?.email,
            savedPosts: usuario?.savedPosts,
          }
        }),
      )

      res.send({ artigoData })
    } catch (error) {
      res.status(404)
      res.send(error)
    }
  })
}
