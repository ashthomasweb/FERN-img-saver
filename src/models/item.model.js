const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema is 'Collection' level category in MongoDB
// key: object-value pairs define non-relational records
// within that category

let Item = new Schema({
    description: {
        type: String
    },
    comment: {
        type: String
    },
    rating: {
        type: String
    },
    imageURL: {
        type: String
    },
    photographer: {
        type: String
    }
})

module.exports = mongoose.model('Item', Item)

// END of document
