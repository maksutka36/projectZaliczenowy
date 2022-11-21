const Post = require('../models/post');
const User = require('../models/user');


class usersController{
    async getMechanics(req, res){
        try {
            const mechanics = User.find({roles: ["USER"]})
            console.log(mechanics)
            mechanics.then((document) => {
                res.status(200).json(document)
            })
        } catch (error) {
            res.status(400).json({message: 'Searching post error'})
        }
    }

    async updatePost(req, res){
    }


}

module.exports = new usersController()