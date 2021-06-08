const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {MongoClient} = require('mongodb');
const Multer = require('multer');

var multer = Multer({
    storage: Multer.MemoryStorage,
    // dest:'./temp',
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

const app = express();
const url = 'mongodb://localhost:27017/BlogAppDB'
const client = new MongoClient(url)


const { Storage } = require('@google-cloud/storage');
const storage = new Storage();


async function listBuckets() {
    // Lists all buckets in the current project

    const [buckets] = await storage.getBuckets();
    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  }

async function uploadFile(file) {
// Uploads a local file to the bucket
    // file.filename = "newFolder/" + file.originalname
    console.log(file)
    await storage.bucket('chunked-blade').upload(file.buffer, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
        }
    });
}

async function connectDB() {
    await client.connect();
    const databaseList = await client.db().admin().listDatabases();
    console.log('Databases: ')
    databaseList.databases.forEach(db => console.log(`- ${db.name}`))
    return databaseList;
}

async function getAllPosts() {
    await client.connect();
    const myCol = await client.db('BlogAppDB').collection('BlogPosts');
    const posts = await myCol.find({}).toArray()
    console.log(posts)
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post('/api/postImage',  multer.single('file'), (req, res) =>{
    console.log(req.file)
    if(req.file){
        uploadFile(req.file)
        res.send(JSON.stringify({"message" : "Success"}))
    } else {
        res.send(JSON.stringify({"message" : "Failure"}))
    }
})

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/databaseList', (req, res) => {
    // connectDB();
    // getAllPosts()
    // listBuckets()
    res.send(JSON.stringify(connectDB()));
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);