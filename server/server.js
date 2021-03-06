require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate.js')

var app = express();
const port = process.env.PORT;


app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then( (doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    })
});


app.get('/todos', authenticate, (req, res) => {
    Todo.find({
      _creator: req.user._id
    }).then( (todos) => {
      res.send({todos});
    }, (e) => {
      res.status(500).send(e);
    });
});

//GET /todos/ID
app.get('/todos/:id', authenticate, (req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
       return res.status(404).send();
  }

  Todo.findOne({
    _id:id,
    _creator:req.user._id
  }).then( (todo) => {
    if (!todo) {
       return res.status(404).send();
    }
     res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
})

//DELETE /todos/ID
app.delete('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
       return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then( (todo) => {
    if (!todo) {
       return res.status(404).send();
    }
     res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
       return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  }, {$set:body}, {new:true}).then( (todo) => {
    if (!todo) {
       return res.status(404).send();
    }
     res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//POST /users
app.post('/users', (req, res) => {
    var usr = new User(
      _.pick(req.body, ['email', 'password'])
    );

    usr.save().then( () => {
      return usr.generateAuthToken();
    }).then( (token) => {
      res.header('x-auth', token).send(usr);
    }).catch((e) => {
      res.status(400).send(e);
    });
});

app.post('/users/login', (req, res) => {
      var body = _.pick(req.body, ['email', 'password']);

      User.findByCredentials(body.email, body.password).then((user) => {
      user.generateAuthToken().then((token) => {
        return res.header('x-auth',token).send(user);
      })
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


//GET /users
app.get('/users', (req, res) => {
  User.find().then( (users) => {
    res.send({users});
  }, (e) => {
    res.status(500).send(e);
  });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
