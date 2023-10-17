const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const Users = require('./Users')

const Products = mongoose.model('products', {
    // designer: {
    //     type: ObjectId,
    //     required: true,
    //     ref: Users
    // },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: [String],
    price: {
        type: Number,
        required: true
    },
    description: String,
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = Products