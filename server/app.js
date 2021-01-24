const express = require('express');
const cors = require('cors'); // Cross-Origin Resource Sharing
const mongoose = require('mongoose'), Admin = mongoose.mongo.Admin; // TODO: remove later

const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());

// const uri = 'mongodb+srv://admin:skiplog123@skiplog.db6ma.mongodb.net/Skiplog?retryWrites=true&w=majority';
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
// // const connection = mongoose.createConnection(uri); // Create mongo connection
connection.once('open', () => {
  console.log("MongoDB connection established successfully");
});

const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// const googleURI = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// mongoose.connection.on('open', (ref) => {
//   console.log('Connected to mongo server.');

//   new Admin(connection.db).listDatabases(function (err, result) {
//     console.log('listDatabases succeeded');
//     // database list stored in result.databases TODO: remove
//     var allDatabases = result.databases;
//     console.log(allDatabases);
//   });
// })

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("MongoDB connection established successfully");

//   client.close();
// });

// Begin Client way
// const MongoClient = require('mongodb').MongoClient;
// async function listDatabases(client){

//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");

//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));

// };

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
/* Tests
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/testGet', (req, res) => {
  res.send('GET request')
})
const users = [
  {
    "username": "John Doe",
    "email": "johndoe@gmail.com",
    "id": 1
  },
  {
    "username": "Mary Sue",
    "email": "marysue@gmail.com",
    "id": 2
  }
]

app.get('/testUsersFetch', (req, res) => {
  // res.send()
  res.json(users);
})

app.get('/testUsersAxios', (req, res) => {
  // res.send()
  // res.send({hello: "world"});
  res.json(users);
})

app.post('/testPost', function (req, res) {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
*/

// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//   // const uri = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   const uri = "mongodb+srv://admin:leadership1997@skiplog.db6ma.mongodb.net/Skiplog?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);
//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();
//       // Make the appropriate DB calls
//       await  listDatabases(client);
//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }
// main().catch(console.error);
// End Client way