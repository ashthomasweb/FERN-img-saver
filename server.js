require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const itemRoutes = express.Router()
const { default: axios } = require('axios')
const imgKey = process.env.UNSPLASH_API_KEY
const port = process.env.PORT || 4000
const firebaseBranchURL = process.env.FB_BRANCH_URL
const firebaseBranchJSON = process.env.FB_BRANCH_JSON

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.json())

function resAllWithMessage(message, res, objData) {
  res.json({message, objData})
}

itemRoutes.route('/item/:id').get(function (req, res) {
  let id = req.params.id
  let allData = []
  axios.get(firebaseBranchJSON).then((response) => {
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
  const { description, comment, rating, imageURL, photographer, _id } = req.body
  let tempItem = {
    description: description,
    comment: comment,
    rating: rating,
    imageURL: imageURL,
    photographer: photographer,
    _id: _id
  }

  let id = req.params.id
  let firebaseID
  let objData
  // get all then match for fbID
  axios
    .get(firebaseBranchJSON)
    .then((response) => {
      let dataObj = Object.entries(response.data)
      dataObj.forEach(item => {
        if (item[1]._id === id) {
          firebaseID = item[0]
        }
      })
    })
    .then(() => {
      axios
      .patch(`${firebaseBranchURL}/${firebaseID}.json`, tempItem)
      .catch((error) => console.log(error))
      // get all again after update and display
    .then(() => {
      axios
      .get(firebaseBranchJSON).then((response) => {
        response.data && (objData = Object.values(response.data))
      })
      .catch((error) => console.log(error))
      .finally(() => {
        resAllWithMessage('Successfully updated!', res, objData)
      })
    })
  })
})

itemRoutes.route('/add').post(function (req, res) {
  let objData
  axios.post(firebaseBranchJSON, req.body)
  .then((response) => {
    axios.get(firebaseBranchJSON).then((response) => {
      objData = Object.values(response.data)
      resAllWithMessage('Successfully added!', res, objData)
    })
  })
})

itemRoutes.route('/delete/:id').post(function (req, res) {
  let id = req.params.id
  let objData
  let firebaseID
  axios.get(firebaseBranchJSON).then((response) => {
    let dataObj = Object.entries(response.data)
    dataObj.forEach(item => {
      if (item[1]._id === id) {
        firebaseID = item[0]
      }
    })
  }).then(() => {
    axios
    .delete(`${firebaseBranchURL}/${firebaseID}.json`).then(() => {
    })
    .catch((error) => console.log(error))
    .then(() => {
      axios.get(firebaseBranchJSON).then((response) => {
        response.data && (objData = Object.values(response.data))
      })
      .catch((error) => console.log(error))
      .finally(() => {
        resAllWithMessage('Successfully deleted!', res, objData)
      })
    })
  })
})

itemRoutes.route('/image/').get(function (req, res) {
  let url = `https://api.unsplash.com/photos/random/?client_id=${imgKey}`
  axios.get(url).then((response) => {
    let data = response.data
    let url = data.urls.regular
    let name = data.user.name
    res.json({message: 'image route reached', url, name })
  })
})

app.use('/', itemRoutes)

app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
