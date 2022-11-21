const {Schema, model} = require('mongoose')

const User = new Schema({
    email:{
        type: String,
        required: true,
        unique: true

    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }]

})



module.exports = model('User', User)