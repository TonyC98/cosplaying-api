const mongoose = require('mongoose')
import { ObjectId } from 'mongoose'

const Orders = mongoose.model('orders', {
    customer: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = Orders