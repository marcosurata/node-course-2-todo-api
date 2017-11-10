// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to MongoDB server');


  // db.collection('Todos').find({
  //     _id: new ObjectID('5a05bd5d4df4ca0a20eca400')
  //   }).toArray().then( (docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch todos',err);
  // });

  // db.collection('Todos').find().count().then( (count) => {
  //   console.log(`Todos count ${count}`);
  // }, (err) => {
  //   console.log('unable to fetch todos',err);
  // });

db.collection('Users').find( {name:'Marcos Urata'}).toArray().then( (docs) => {
  console.log(JSON.stringify(docs, undefined, 4));
}, (err) => {
    console.log('unable to fetch users ',err);
});


  //db.close();
});
