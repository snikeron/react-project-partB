const User = require('../users/User')

// User.create({
//     email: 'admin@encode.com',
//     password: '12345678'
// })
// .then(user => {
//     console.log(user)
// })
// .catch(err => {
//     console.error(err)
// })

User.update({email: 'admin@encode.com'}, {
    $push: {roles: 'admin'}
})
.catch(err => console.error(err))