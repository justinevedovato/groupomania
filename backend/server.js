const db = require('./config/db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const User = require('./models/user')
const Post = require('./models/post')

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')

const app = express()
const port = 3000
app.use(cors())

// Pour créer la base de données si elle n'existe pas
db.sync()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/seed', async (req, res) => {
//   // await User.create({
//   //   username: 'janedoe',
//   //   firstname: 'jane',
//   //   birthday: new Date(1980, 6, 20),
//   // })
//   // await Category.create({
//   //   title: 'New Category Test',
//   //   description: 'I am a very nice category',
//   // })
//   await Thread.create({
//     title: 'New neeeew thread',
//     categoryId: 1,
//   })
//   await Post.create({
//     body: 'lalalalala in new thread ',
//     threadId: 2,
//     userId: 1,
//   })
//   res.send('okay')
// })

app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/post', postRoutes)

// posts

// await Category.create({
//   title: 'New Category Test',
//   description: 'I am a very nice category',
// })
// await Thread.create({
//   title: 'New thread',
//   categoryId: 1,
// })
// await Post.create({
//   body: 'lalalalala post example',
//   userId: 1,
// })
// res.send('okay')

// Récupérer toutes les catégories (page d'accueil)
// app.get('/category', async (req, res) => {
//   const cats = await Category.findAll()
//   res.send(cats)
// })

// Récupérer tous les threads dans la catégorie choisie
// app.get('/category/:id', async (req, res) => {
//   const category = await Category.findByPk(req.params.id, { include: Thread })
//   res.send(category)
// })

// Récupérer tous les posts dans le post choisi
// app.get('/post/:id', async (req, res) => {
//   const post = await Post.findByPk(req.params.id)
//   res.send(post)
// })

// app.get('/post/:id', (req, res, next) => {
//   console.log('test delete')
//   Post.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then(() => res.send('post supprimé!'))
//     .catch((error) => res.send({ error }))
// })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
