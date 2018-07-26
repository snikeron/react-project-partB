const mongoose = require('../db/connectdb')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    roles: [{
        type: String
    }]
});

userSchema.pre('save', function (next) {

    const user = this;

    if(!user.password) return next(new Error('no password supplied'))

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash
        next()
    })

})

userSchema.statics.loginAsAdmin = function loginAsAdmin(email, password) {

    // get user so we can evaluate them
    return this.findOne({email: email})
    .then( user => {
    
        if(!user) {
            return Promise.reject(new Error('user not found'))
        }

        if(!user.roles) {
            return Promise.reject(new Error('No admin roles for user'))
        }

        if(!user.roles.find(role => role === 'admin')){
            return Promise.reject(new Error('No admin roles for user'))
        }

        return bcrypt.compare(password, user.password)
        .then((result) => {
            if(!result) {
                return Promise.reject(new Error('Invalid Password'))
            }
            console.log(user)
            return user
        })
    })
}


const User = mongoose.model('users', userSchema);

module.exports = User
