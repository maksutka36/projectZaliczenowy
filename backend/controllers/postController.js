const Post = require('../models/post');
const User = require('../models/user');


class postController{
    async createPost(req, res){
        try {
            const {
                name,
                surname,
                phone,
                carNumber,
                brand,
                mechanics,
                problem,
                endDate,
                startDate,
                comment,
                status
            } = req.body
            const createPost = new Post({
                name: name,
                surname: surname,
                phone: phone,
                carNumber: carNumber,
                brand: brand,
                mechanics: mechanics,
                problem: problem,
                comment: comment,
                endDate: endDate,
                startDate: startDate,
                status: status,
            })
            
            console.log(createPost)
            await createPost.save().then( createdPost => {
                console.log(createdPost)
                res.status(200).json({
                    message:"Post added successfully",
                    post:{
                        ...createdPost,             
                        id: createdPost._id
                    }
                })
            })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    async updatePost(req, res){
        try {
            const {
                id, 
                name,
                surname,
                phone,
                carNumber,
                brand,
                mechanics,
                problem,
                endDate,
                startDate,
                comment,
                status} = req.body
            const post = new Post({
                _id: id,
                name: name,
                surname: surname,
                phone: phone,
                carNumber: carNumber,
                brand: brand,
                mechanics: mechanics,
                problem: problem,
                comment: comment,
                endDate: endDate,
                startDate: startDate,
                status: status,
            });
            console.log(id)
            console.log(post)
            Post.updateOne({_id: id}, post).then(result => {
                console.log(result)
                if(result.matchedCount > 0){
                    res.status(200).json({ message: "Update successful!" });
                }else {
                    res.status(401).json({ message: "You have no rights" });
                }
              });
        
        } catch (error) {
            res.status(400).json({message: 'Update post error'})
        }
    }



    async findPosts(req, res){
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const postQuery = Post.find({ status : {$ne: 'Naprawiano'}})
            let fetchedPost;
            if (pageSize && currentPage){
                postQuery
                    .skip(pageSize * (currentPage - 1))
                    .limit(pageSize)
            }
            postQuery
                .then( document => {
                    fetchedPost = document;
                    return Post.count({ status : {$ne: 'Naprawiano'}})
                })
                .then( count => {
                    res.status(200).json({
                        message: "Post fetched successfully",
                        posts: fetchedPost,
                        maxPosts: count
                    })    
                })
        } catch (error) {
            res.status(400).json({message: 'Searching post error'})
        }
    }
    async findFixedPosts(req, res){
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const postQuery = Post.find({status: 'Naprawiano'})
            let fetchedPost;
            if (pageSize && currentPage){
                postQuery
                    .skip(pageSize * (currentPage - 1))
                    .limit(pageSize)
            }
            postQuery
                .then( document => {
                    fetchedPost = document;
                    return Post.count({status: 'Naprawiano'})
                })
                .then( count => {
                    res.status(200).json({
                        message: "Post fetched successfully",
                        posts: fetchedPost,
                        maxPosts: count
                    })    
                })
        } catch (error) {
            res.status(400).json({message: 'Searching post error'})
        }
    }

    async findById(req, res){
        try {
            const post = await Post.findById(req.params.id)
            if (post) {
                res.status(200).json(post);
              } else {
                res.status(404).json({ message: "Post not found!" });
              }
        } catch (error) {
            res.status(400).json({message: 'Searching post error'})
        }
    }

    async deletePost(req, res){
        try {
            Post.deleteOne({ _id: req.params.id}).then( result => {
                console.log(result)
             
                if(result.deletedCount > 0){
                    res.status(200).json({ message: "Deletion successful!" });
                }else {
                    res.status(401).json({ message: "You have no rights" });
                }
            }
            );
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Error delete"})
        }
    }
}

module.exports = new postController()