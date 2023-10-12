const mongoose = require('mongoose')

const Users = mongoose.model('users', {
    email: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    deliveryAddress: {
        type: String,
        // required: true
    },
    billingAddress: {
        type: String,
        // required: true
    },
    paymentMethod: Array,
    phone: String,
    preferences: Array
})

module.exports = Users