const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PostMessage = require('../models/postMessage.js');
const auth = require('../middleware/auth.js');

/**
 * query -- /posts?page=1 --> page : 1
 * params -- /posts/:id --> we can get that specific id information
 */
router.get('/search', async (req, res) => {
    const { searchQuery,tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i'); //ignore the case -- case insensitive
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in :  tags.split(',') } } ]
        })
        //get the posts which follow atleast one of the criteria
        // either match the title
        // or search in the tags array, if it contains atleast one of the tags sent through the query
        res.status(200).send({ data: posts });
    } catch (error) {
        console.log(error);
    }        
})

//Get all the posts
router.get('/', async (req, res) => {
    const { page } = req.query;

    try {
        const limit = 8;
        const startIndex = (Number(page) - 1) * limit;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ index: -1 }).limit(limit).skip(startIndex);
        res.status(200).send({ data: posts, currentPage: Number(page), totalNumberOfPages: Math.ceil(total / limit) });
    } catch (e) {
        res.status(404).send(e);
    }
});
router.get('/:id', async (req, res) => {
    try {
        console.log('came here')

        const id = req.params.id;
        const post = await PostMessage.findById(id);
        res.status(200).send(post);
        console.log('end')

    } catch (error) {
        res.status(404).send(error);
    }
})

//Create a post
router.post('/',auth, async (req, res) => {
    try {
        const post = req.body;
        const newpost = new PostMessage({...post,creator: req.userId,createdAt : new Date().toISOString()});
        await newpost.save();
        res.status(201).send(newpost);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/:id/commentPost',auth, async (req, res) => {
    try {
        console.log('enter comments');
        const id = req.params.id;
        const comment = req.body.comment;
        const post = await PostMessage.findById(id);
        post.comments.push(comment);
        //await post.save();
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).send(updatedPost);
        console.log('exit comments');

    } catch (e) {
        res.status(500).send(e);
    }
})

//Update post
router.patch('/:id',auth, async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;
        //Check if the id is a valid one
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).send('No posts with that ID')
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });
        res.send(updatedPost);
    } catch (e) {
        res.send(e);
    }
})

//delete p
router.delete('/:id',auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).send('No posts with that ID')
        }
        await PostMessage.findByIdAndRemove(req.params.id);
        console.log('successfully deleted')
        res.send('successfully deleted post');
    } catch (e) {
        res.send(e);
    }
})

//like post
router.patch('/:id/likePost', auth,async (req, res) => {
    console.log('route hitting')
    try {
        //check if the auth() has set the userId on req
        if (!req.userId)
            return res.send({ message: 'Unauthenticated' });
        
         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).send('No posts with that ID')
         }
        const post = await PostMessage.findById(req.params.id);
        //The user has already liked a post 
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(req.params.id, post ,{new : true});
        console.log(updatedPost)
        res.status(200).send(updatedPost);
       console.log('post liked')
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;