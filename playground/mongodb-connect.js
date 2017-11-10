// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to MongoDB server');

// db.collection('Todos').insertOne({
//     text:'something to do',
//     completed:false
// }, (err, result) => {
//   if (err) {
//     return console.log('unable to insert todo',err);
//   }
//
//   console.log(JSON.stringify(result.ops, undefined, 2));
// });


// db.collection('Users').insertOne({
//     name:'Marcos Urata',
//     age:36,
//     location:'Brasilia'
// }, (err, result) => {
//     if (err) {
//       return console.log('unable to insert user',err);
//     }
//     console.log(result.ops[0]._id.getTimestamp());
// });


  db.close();
});
