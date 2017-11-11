const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove();

Todo.findByIdAndRemove('5a073cd7dc4cea1bc7af1a75').then((todo) => {
  console.log('todo removed',todo);
})
