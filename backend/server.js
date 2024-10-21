const express = require('express')
const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

// Connect to URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName="passop"
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save a passwords
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

// Delete a passwords
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})