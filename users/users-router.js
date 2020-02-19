const router = require('express').Router();
const Users = require('./users-model.js');
const authRequired = require('../auth/auth-required-middleware.js');

router.get('/', authRequired, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        });
});

module.exports = router;