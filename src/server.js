import express from 'express'
import {
  MongoClient
} from 'mongodb'
import Schema from './js/data/Schema'
import GraphQLHTTP from 'express-graphql'
import BabelPolyfill from 'babel-polyfill'
import fs from 'fs'
import {graphql} from 'graphql'
import {introspectionQuery} from 'graphql/utilities'

let app = express();

//app.get('/', (req, res) => res.send('hello express5!'));

// function allowCrossDomain(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// }
//
// app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));

(async () => {
  let db = await MongoClient.connect(process.env.MONGO_URL);
  let schema = Schema(db);

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
  }));

  app.listen(3000, () => console.log("Listening on port 3000"));

  // Generate schema.json
  // let json = await graphql(schema, introspectionQuery);
  // fs.writeFile(__dirname + '/schema.json', JSON.stringify(json, null, 2), err => {
  //   if (err) throw err;
  //
  //   console.log("JSON schema created");
  //
  // });

})();

//let db;

// export MONGO_URL=mongodb://moravic:moravic@ds015849.mlab.com:15849/moravic
// MongoClient.connect(process.env.MONGO_URL, (err, dbs) => {
//   if (err) throw err;
//
//   db = dbs;
//
//   app.use('/graphql', GraphQLHTTP({
//     schema: Schema(db),
//     graphiql: true
//   }));
//
//   app.listen(3000, () => console.log("Listening on port 3000"));
//
// });

// app.get("/data/links", (req, res) => {
//   db.collection("links").find({}).toArray((err, links) => {
//     if (err) throw err;
//
//     res.json(links);
//   });
// });
