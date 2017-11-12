const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashPassword = '$2a$10$vXXV8A0yFOEfiSP7Yf6yA.QZLKELgfzRGQHTEmPCOupR551Jh7WMe';

bcrypt.compare(password, hashPassword, (err, res) => {
  console.log(res);
});

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// var data = {
//   id:10
// };
//
// var token = jwt.sign(data, '123.abc');
// console.log(token);
//
// var decryptedData = jwt.verify(token, '123.abc');
// console.log(decryptedData);
