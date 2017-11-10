// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5a05c8f887efa0bb36c9de25")
  }, {
    $set: {
      completed: true
    }
  }, {
        returnOriginal: false
    }).then((res) => {
      console.log(res);
    });


    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5a05cd8b87efa0bb36c9e0c0')
    }, {
      $set: {
          name:'Marcos Urata',
          location:'São Paulo'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal:false
    }
  ).then((res) => {
      console.log(JSON.stringify(res, undefined, 4));
  });

  //db.close();
});
