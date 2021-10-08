const express = require("express");
const MongoClient = require('mongodb').MongoClient;


const server = express()

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static('public'));


const mongoUrl = 'mongodb://127.0.0.1:27017';

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(client => {
        console.log(`connected mongoDB: ${mongoUrl}`)
        let db = client.db("newTestBase")
        const quotesCollection = db.collection('quotes')

        server.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/browsemongo')
                })
                .catch(error => {
                    console.log(error)
                })
        })

        server.get('/browsemongo', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(result => {
                    res.render('index.ejs', { quotes: result })
                })
                .catch(error => {
                    console.log(error)
                })
        })

        server.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Blinx' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
        })
        server.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`Deleted ${req.body.name}'s quote`)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => {
        console.log(error)
    })




server.get('/', (req, res) => {
    res.json({ message: "Welcome to the default zone, please specify a path" })
})



module.exports = server;