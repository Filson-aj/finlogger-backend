const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = new Schema({
        email: {
            type: String, 
            unique: {
                value: true,
                message: 'This {VALUE} address already exist '
            },
            required: {
                value: true,
                message: 'Email address is required'
            },
            lowercase: true,
            validate:{
                validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                message: '{VALUE} is not a valid email address!'
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
        },
        roles: {
            type: [String],
            default: ['User'],
        },
        active: {
            type: Boolean,
            default: true,
        },
    }, {timestamps: true});

module.exports = mongoose.model('User', User);