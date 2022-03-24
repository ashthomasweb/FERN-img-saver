require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const mongoose = require('mongoose')
const itemRoutes = express.Router()
let port = process.env.PORT || 4000
let imgKey = process.env.UNSPLASH_API_KEY

// let Item = require('./src/models/item.model')
const { default: axios } = require('axios')

app.use(cors())
app.use(bodyParser.json())

// change database variable to project appropriate name
// find and replace acorss all files
// mongoose.connect('mongodb://127.0.0.1:27017/mernTemp', { useNewUrlParser: true })
// const connection = mongoose.connection

// connection.once('open', function () {
//   console.log('Local MongoDB database connection successfully established here')
// })

function resAllWithMessage(message, res, objData) {
  res.json({message, objData})
}

itemRoutes.route('/').get(function (req, res) {
  console.log('home route')
  axios.get('https://next-ts-img-crud-default-rtdb.firebaseio.com/branch.json').then((response) => {
    let objData = response.data
    console.log(objData)
    resAllWithMessage('Firebase Realtime DB retrieval success!', res)
  })
})

itemRoutes.route('/item/:id').get(function (req, res) {
  let id = req.params.id
  let url = `https://next-ts-img-crud-default-rtdb.firebaseio.com/branch.json`
  let allData = []
  axios.get(url).then((response) => {
    allData = Object.values(response.data)
  }).then(() => {
    allData.forEach((item) => {
      if (item._id === id) {
        res.json({ message: 'Item retrieved', item})
      }
    })
  })
})

itemRoutes.route('/update/:id').post(function (req, res) {
  console.log(req.params.id)
  
  
  // Item.findById(req.params.id, function (error, item) {
  //   if (!item) res.status(404).send('No data with that ID found')
  //   else {
  //     const { description, comment, rating, imageURL, photographer } = req.body
  //     item.description = description
  //     item.comment = comment
  //     item.rating = rating
  //     item.imageURL = imageURL
  //     item.photographer = photographer
  //   }
  //   item.save()
  //     .then(() => resAllWithMessage('Updated!', res))
  //     .catch((error) => {
  //       res.status(400).send('Update not possible')
  //     })
  // })
})

itemRoutes.route('/add').post(function (req, res) {
  let url = 'https://next-ts-img-crud-default-rtdb.firebaseio.com/branch.json'
  axios.post(url, req.body)
  .then((response) => {
    console.log(response)
    let objData

    axios.get(url).then((response) => {
      objData = Object.values(response.data)
      resAllWithMessage('Successfully added!', res, objData)
    })
  })
})

// itemRoutes.route('/delete/:id').post(function (req, res) {
//   let _id = req.params.id
//   Item.deleteOne({ _id })
//     .then(() => resAllWithMessage('Deleted!', res))
//     .catch((error) => {
//       res.status(400).send('Deleting new item failed')
//     })
// })

itemRoutes.route('/image/').get(function (req, res) {
  let url = `https://api.unsplash.com/photos/random/?client_id=${imgKey}`
  axios.get(url).then((response) => {
    let data = response.data
    let url = data.urls.regular
    let name = data.user.name
    res.json({message: 'image route reached', url, name })
  })
})

app.use('/mernTemp', itemRoutes)

// Listener compatible with Heroku, Localhost
app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
