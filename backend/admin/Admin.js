const mongoose = require('../db/connectdb')
const { Schema } = mongoose

const adminSchema = new Schema({
    email: String,
    password: String
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
