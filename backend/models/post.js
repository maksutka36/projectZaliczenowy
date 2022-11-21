const {Schema, model} = require('mongoose')
const user = require('../models/user');

const Post = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    carNumber:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    mechanics:{
        type: Array,
        ref: user,
        required: false
    },
    problem:{
        type: String,
        required: false
    },
    comment:{
        type: String,
        required: false
    },
    startDate:{
        type: String,
        required: false
    },
    endDate:{
        type: String,
    },
    status:{
        type: String,
        default: 'Ogląd'
    }
})


module.exports = model('Post', Post)