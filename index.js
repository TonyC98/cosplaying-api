//import express
const express = require('express')
//express function
const app = express()
const bodyParser = require('body-parser')

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//route
app.get('/', (req, res) => {
    res.send('Welcome to this website')
    console.log("test test test");
})
//server open
app.listen(4000, () => {
    console.log("server open")
})

//import mongodb and configure
// const {MongoClient} = require('mongodb')
// const client = new MongoClient(
//     'mongodb+srv://antocaricati98:7yj0nEzIuUIC7G6r@cluster0.zhl5dbi.mongodb.net/cosplaying'
// )
// const db = client.db('cosplaying')

//importing mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://antocaricati98:7yj0nEzIuUIC7G6r@cluster0.zhl5dbi.mongodb.net/cosplaying')

//models
const Users = require('./models/Users')

//configure collections
// const Users = db.collection('users')

//main route

//use route
app.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        let newUser = await Users.create(req.body)
        res.send(newUser)
        console.log(newUser);
    } catch (err) {
        res.send(err)
        console.log(err);
    }
})
    
