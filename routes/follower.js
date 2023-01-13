const express = require('express')
const router = express.Router()
const Follower = require('../models/followers')

//Getting all
router.get('/', async (req,res) => {
    try {
        const followers = await Follower.find()
        res.json(followers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getFollower, (req,res) => {
    res.send(res.follower.name)
})

//Create one
router.post('/', async (req,res) => {
    const follower = new Follower({
        name: req.body.name,
        followedToPage: req.body.followedToPage
    })

    try {
        const newFollower = await follower.save()
        res.status(201).json(newFollower)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating one
router.patch('/:id', getFollower, async (req, res) => {
    if (req.body.name != null) {
        res.follower.name = req.body.name
    }

    if (req.body.followedToPage != null) {
        res.follower.followedToPage = req.body.followedToPage
    }

    try {
        const updatedFollower = await res.follower.save()
        res.json(updatedFollower)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Deleting one
router.delete('/:id', getFollower, async (req,res) => {
    try {
        await res.follower.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getFollower(req, res, next) {
    let follower

    try {
        follower = await Follower.findById(req.params.id)
        if (follower == null) {
            return res.status(404).json({ message: 'Cannot find follower' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.follower = follower
    next()
}


module.exports = router