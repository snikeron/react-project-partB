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
    expectedRoleType: String,
    techStack: [String],
    contactSource: String,
    clientNotes: String,
    personalNotes: String, 
    priority: [{
        id: String,
        content: String
    }],
    expectedCompany: [String],
    resumeUrl: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

candidateSchema.index({ '$**': 'text' })

const Candidate = mongoose.model('Candidates', candidateSchema)

module.exports = Candidate

