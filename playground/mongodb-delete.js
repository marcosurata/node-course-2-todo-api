// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to MongoDB server');


  // db.collection('Todos').deleteMany({text:'eat lunch'}).then( (result) => {
  //   console.log(result);
  // });

//deleteOne
  // db.collection('Todos').deleteOne({text:'eat lunch'}).then( (res) => {
  //   console.log(res);
  // });

  // db.collection('Todos').findOneAndDelete({completed:false}).then( (res) => {
  //   console.log(res);
  // });

  db.collection('Users').deleteMany({name:'Marcos Urata'}).then( (res) => {
    console.log(res);
  });

  db.collection('Users').findOneAndDelete({_id:new ObjectID('5a05bfa731791334c82f0ed9')}).then( (res) => {
    console.log(res);
  });

  //db.close();
});
