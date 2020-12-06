const express = require('express')
const bodyparser = require('body-parser')
const User = require('./models/user')
const Category = require('./models/category')
const Thread = require('./models/thread')
const Post = require('./models/post')
const db = require('./config/db')
const app = express()
const port = 3000

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

app.use('/auth', userRoutes)
app.use('/forum', forumRoutes)

// posts

await Category.create({
  title: 'New Category Test',
  description: 'I am a very nice category',
})
await Thread.create({
  title: 'New thread',
  categoryId: 1,
})
await Post.create({
  body: 'lalalalala post example',
  threadId: 2,
  userId: 1,
})
res.send('okay')

// Récupérer toutes les catégories (page d'accueil)
app.get('/category', async (req, res) => {
  const cats = await Category.findAll()
  res.send(cats)
})

// Récupérer tous les threads dans la catégorie choisie
app.get('/category/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: Thread })
  res.send(category)
})

// Récupérer tous les posts dans la thread choisie
app.get('/thread/:id', async (req, res) => {
  const thread = await Thread.findByPk(req.params.id, { include: Post })
  res.send(thread)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
