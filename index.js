//import express
const express = require('express')
//express function
const app = express()
//route
app.get('/', (req,res) => {
    res.send('Welcome to this website')
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

//configure collections
const Users = db.collection('users')

//use route
app.post('/users', async (req,res) => {
    try {
    let user = await Users.create(req.body)
    res.send(user)
    } catch (err) {
        res.err(err)
    }
})
    
