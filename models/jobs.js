const mongoose = require('mongoose');

const jobschema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'please provide company name'],
        maxLength: 500
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
}, { timestamps: true });


module.exports = mongoose.model('Job', jobschema);