const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbname = 'nmc';
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;


app.post('/reginsert',async (req,res)=>{
    var reg=req.body;
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('register');
    const result=await collection.insertOne(reg);
    console.log(result);
    res.send(result);
    res.end();
});

app.get('/regread',async (req,res)=>{
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('register');
    const result= await collection.find({}).toArray();
    res.send(result);
    console.log(result);
    res.end();
});

app.get('/logdata', async (req, res) => {
    var uname = req.query.username;
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('register');
    const result = await collection.find({ "username": uname }).toArray();
    res.send(result);
    console.log(result);
    res.end();
});

app.delete('/regdelete/:id', async (req, res) => {
    const id = req.params.id;
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('register');
    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    });
    res.send(result);
});

app.put('/regupdate/:id', async (req, res) => {
    const id = req.params.id;
    const newdata = req.body;
    delete newdata._id; 
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('register');
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: newdata }
    );
    res.send(result);
});

app.post('/complaintinsert', async (req, res) => {
    const complaint = req.body;
    complaint.status = "Pending";
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('complaints');
    const result = await collection.insertOne(complaint);
    res.send(result);
});

app.get('/complaintread', async (req, res) => {

    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('complaints');
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.put('/complaintupdate/:id', async (req, res) => {
    const id = req.params.id;
    const statusData = req.body;
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('complaints');
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: statusData.status } }
    );
   res.send(result);
});

// ===== News APIs =====

// Add at bottom of your existing server.js
app.post('/newsinsert', async (req, res) => {
  const news = req.body;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('news');
  const result = await collection.insertOne(news);
  res.send(result);
});

app.get('/newsread', async (req, res) => {
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('news');
  const result = await collection.find({}).toArray();
  res.send(result);
});

app.put('/newsupdate/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  delete newData._id;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('news');
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });
  res.send(result);
});

app.delete('/newsdelete/:id', async (req, res) => {
  const id = req.params.id;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('news');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// ===== Event APIs =====
app.post('/eventsinsert', async (req,res) => {
  const event = req.body;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('events');
  const result = await collection.insertOne(event);
  res.send(result);
});

app.get('/eventsread', async (req,res) => {
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('events');
  const result = await collection.find({}).toArray();
  res.send(result);
});

app.put('/eventsupdate/:id', async (req,res) => {
  const id = req.params.id;
  const newData = req.body;
  delete newData._id;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('events');
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });
  res.send(result);
});

app.delete('/eventsdelete/:id', async (req,res) => {
  const id = req.params.id;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('events');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// ===== Participants APIs =====

app.post('/participantsinsert', async (req,res) => {
  const participant = req.body;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('participants');
  const result = await collection.insertOne(participant);
  console.log(result);
  res.send(result);

});

app.get('/participantsread', async (req,res) => {
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('participants');
  const result = await collection.find({}).toArray();
  res.send(result);
});

app.put('/participantsupdate/:id', async (req,res) => {
  const id = req.params.id;
  const statusData = req.body;
  await client.connect();
  const db = client.db(dbname);
  const collection = db.collection('participants');
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: statusData }
  );
  res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
