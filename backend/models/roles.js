const {Schema, model} = require('mongoose')

const Roles = new Schema({
    value: { type: String, unique: true, default: "USER"} 

})



module.exports = model('Roles', Roles)