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

