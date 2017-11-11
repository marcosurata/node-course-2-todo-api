const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// var id = '5a05eff3fd0e5237c07991201';
//
// if(!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// }

// Todo.find({
//   _id: id
// }).then( (todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then( (todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then( (todo) => {
//     if(!todo) {
//       return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

var userId = '5a05dd42bfc4ef17fc745b72';
User.findById(userId).then( (user) => {
  if (!user) {
      return console.log('User not found');
  }
  console.log(JSON.stringify(user, undefined, 4));
}, (e) => {
  console.log(e);
}).catch( (e) => console.log(e));
