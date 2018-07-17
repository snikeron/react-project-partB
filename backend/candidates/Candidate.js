const mongoose = require('../db/connectdb')

const {Schema} = mongoose

const candidateSchema = new Schema ({
    
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress: String,
    location: String,
    currentJobTitle: String,
    CurrentEmployer: String,
    roleType: String,
    responsibilities: String,
    minSalary: Number,
    expectedJobTitle: String,
    techStack: [String],
    contactSource: String,
    clientNotes: String,
    personalNotes: String, 
    priority: [String],
    expectedCompany: [String],
    resumeUrl: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date

})

candidateSchema.index({ '$**': 'text' })

const Candidate = mongoose.model('Candidates', candidateSchema)

module.exports = Candidate

