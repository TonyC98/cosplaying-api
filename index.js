//packages
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
// const passport = require('passport')

//dotenv
const dotenv = require("dotenv")
dotenv.config();

//app
const app = express()

//middleware
//::: logger :::
app.use(logger('tiny'))
app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  )
//::: express :::
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//::: bodyParser:::
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//::: cookieParser :::
app.use(cookieParser())

// mongoose
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
        console.log('Connected to MongoDB')
    }
)

//security
require('./express-sessions')(app)
//server open
app.listen(4000, () => {
    console.log("server open")
})

//models
const Users = require('./models/Users')
const Products = require('./models/Products')
const Orders = require('./models/Orders')
const Events = require('./models/Events')
const Reviews = require('./models/Reviews');

// ::::: ROUTES :::::
// //server open
// app.listen(4000, () => {
//     console.log("server open")
// })

//homepage
app.get('/', (req, res) => {
    res.send('Welcome to this website')
    console.log("test test test");
})

//signup route
app.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        let newUser = await Users.create(req.body)
        // req.login(newUser)
        req.login(newUser, (err) => {
            if (err) { throw err }
            res.send(newUser)
        })
        // res.send(newUser)
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

//login route
app.post('/login', async (req,res) => {
    try {
        let user = await Users.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if (user) {
            console.log(user);
            req.login(user, (err) => {
                if (err) { throw err }
                res.send(user)
            })
        } else {
            res.send('Email or password not recognised.')
        }
    } catch (err) {
        res.send('Caught error')
        console.log(err);
    }
})

//confirmation route
// app.get('/orders:id', async (req,res) => {
//     try {
//         let confirmation = await Orders.findById(req.query.id)
//         console.log(confirmation)
//     } catch (err) {
//         res.send(err)
//         console.log(err);
//     }
// })
//checkout get route -- seems to be same as above (commented) route?
app.get('/orders:id', async (req, res) => {
    try {
        let confirmedOrder = await Orders.findById(req.query)
        res.send(confirmedOrder)
        console.log(confirmedOrder)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

//all products route
// app.get('/products', async (req, res) => {
//     try {
//         let products = await Products.find(req.query)
//         res.send(products)
//     } catch (err) {
//         res.send(err)
//         console.log(err);
//     }
// })

//search product route ------ to be confirmed
// app.get('/products', async (req,res) => {
//     try {
//         let filteredProducts = await Products.find({ name: { $regex: 'req.query', $options: 'i' } })
//         res.send(filteredProducts)
//         console.log(filteredProducts)
//     } catch (err) {
//         res.send(err)
//         console.log(err)
//     }
// })

//get product route
app.get('/products', async (req, res) => {
    try {
        let product = await Products.findById(req.query.id)
        res.send(product)
        console.log(product)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

//checkout post route
app.post('/orders', async (req, res) => {
    try {
        let order = await Orders.create(req.body)
        res.send(order)
        console.log(order)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

//get profile route
app.get('/profile', async (req, res) => {
    try {
        let profile = await Users.findById(req.query)
        res.send(profile)
        console.log(profile)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

//new product route
app.post('/products', async (req, res) => {
    try {
        let newProduct = await Products.create(req.body)
        res.send(newProduct)
        console.log(newProduct)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

//edit product route
app.patch('/products:id', async (req, res) => {
    try {
        let modifiedProduct = await Products.findByIdAndEdit(req.body)
        console.log(modifiedProduct)
        res.send(modifiedProduct)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})
  
  // Error Handler
app.use((err, req, res, next) => {
    // Respond with an error
    res.status(err.status || 500)
    res.send({
        message: err
    })
})

module.exports = app