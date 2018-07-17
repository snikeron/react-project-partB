const Candidate = require('./Candidate')


const candidates = [
    {
        firstName: 'Mill',
        lastName: 'Smith ',
        phoneNumber: '0450890999',
        emailAddress: 'mill@example.com ',
        location: 'Melbourne',
        currentJobTitle: 'Java Developer',
        CurrentEmployer: 'Google',
        roleType: 'Permanent',
        responsibilities: 'Senior Engineer',
        technologies: ['javascript', 'ruby', 'rails', 'mongodb', 'mongoose', 'SQLdb', 'JAVA'],
        minSalary: 180000,
        expectedJobTitle: 'Senior Engineer',
        techStack: ['javascript', 'ruby', 'rails', 'mongodb', 'mongoose', 'SQLdb', 'JAVA'],
        contactSource: 'linkedIn',
        clientNotes: 'An excellent candidate',
        personalNotes: 'This guy is awesome',
        priority: ['MONEY'],
        expectedCompany: ['Amazon'],
        resumeUrl: ' ',
        isActive: true,
        createdAt: new Date('15 July 2018'),
        updatedAt: new Date('16 July 2018')
    }
]
Candidate.create(candidates)
    .then(()=> {
        console.log('seeded candidates');
    })