const Router = require('express')
const router = new Router()
const controller = require('../controllers/postController')

router.post('/create', controller.createPost)
router.put('/update/:id', controller.updatePost)
router.get('/get', controller.findPosts)
router.get('/getFixed', controller.findFixedPosts)
router.get('/:id', controller.findById)
router.delete('/:id', controller.deletePost)

module.exports = router