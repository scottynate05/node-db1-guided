const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// /api/posts/
router.get('/', (req, res) => {
    // SELECT * FROM Posts;  (SQL)
    db.select('*')
        .from('posts')
        .then(postsArray => res.status(200).json({ data: postsArray }))
        .catch( err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // SELECT * FROM posts WHERE id = id
    db('posts')
        // .where({ id: id })
        // .where({id})
        // .where('id', '=', id)
        .where('id', id)
        .first()
        .then(posts => res.status(200).json({ data: posts }))
        .catch( err => console.log(err));
});

router.post('/', (req, res) => {
    const postData = req.body;
    // INSERT INTO posts (fields...) VALUES (values...)
    db('posts')
        .insert(postData)
        .then(id => res.status(201).json({ data: id[0] }))
        .catch(err => console.log(err))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // UPDATE posts SET field = new value WHERE id = id
    db('posts')
        .where('id', id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: 'Error updating!' })
            }
        })
        .catch(err => res.status)
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where('id', id)
    .delete()
    .then(count => {
        if (count > 0) {
            res.status(200).json({ data: count })
        } else {
            res.status(404).json({ message: 'Error deleting!' })
        }
    })
    .catch(err => console.log(err))
});

module.exports = router;