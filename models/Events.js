const mongoose = require('mongoose')

const Events = mongoose.model('events', {
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    paymentMethod: Array,
    phone: String,
    preferences: Array
})

module.exports = Events