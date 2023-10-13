//import express
const express = require('express')
//express function
const app = express()
//import cors
// import cors from "cors"
// app.use(cors())
//dotenv
const dotenv = require("dotenv")
// import dotenv from "dotenv";
dotenv.config();
// mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)

//middleware
//::: bodyParser:::
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//::: passport :::
app.use(passport.initialize())

//route
app.get('/', (req, res) => {
    res.send('Welcome to this website')
    console.log("test test test");
})

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
// const passport = require('passport');

// ::::: ROUTES :::::
//signup route
app.post('/signup', async (req, res) => {
    try {
        let newUser = await Users.create(req.body)
        req.login(newUser)
        res.send(newUser)
        console.log(newUser);
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
app.get('/orders:id', async (req,res) => {
    try {
        let confirmation = await Orders.findById(req.query.id)
        console.log(confirmation)
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

//all products route
app.get('/products', async (req, res) => {
    try {
        let products = await Products.find(req.query)
        res.send(products)
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})

//search product route ------ to be confirmed
app.get('/products', async (req,res) => {
    try {
        let filteredProducts = await Products.find({ name: { $regex: 'req.query', $options: 'i' } })
        res.send(filteredProducts)
        console.log(filteredProducts)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

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

//checkout get route
app.get('/orders:id', async (req, res) => {
    try {
        let confirmedOrder = await Orders.findById(req.query)
        res.send(confirmedOrder)
        console.log(confirmedOrderrder)
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
        let newProduct = await Products.createOne(req.body)
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