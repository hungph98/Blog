const Post = require("../models/Post");

class PostController{

    // create
    createPost = async (req, res, next) => {
        const newPost = new Post(req.body);
        try {
            const post = await newPost.save();
            res.status(200).json(post)
        } catch (err) {
            next(err)
        }
    }

    // update
    updatePost = async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    const postUpdate = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true});
                    res.status(200).json(postUpdate);
                } catch (err) {
                    next(err)
                }
            } else {
                res.status(401).json("You can update only your post!")
            }
        } catch (err) {
            next(err)
        }
    }

    // Delete
    deletePost = async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    await Post.findByIdAndDelete();
                } catch (err) {
                    next(err)
                }
            } else {
                res.status(401).json("You can update only your post!")
            }
        } catch (err) {
            next(err)
        }
    }

    // Get Post By id
    getPostById = async (req, res, next) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post)
        } catch (err) {
            next(err)
        }
    }

    // Get all post
    getAllPost = async (req, res, next) => {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let posts;
            if (username) {
                posts = await Post.find({username})
            } else if (catName) {
                posts = await Post.find({categories: {
                    $in:[catName]
                    }})
            } else {
                posts = await Post.find();
            }
            res.status(200).json(posts);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new PostController;