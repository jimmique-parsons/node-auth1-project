const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

// /api/auth/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

// /api/auth/login
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: 'Logged In' });
            } else {
                res.status(401).json({ message: 'Sorry that is Incorrect' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// /api/auth/logout
router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).send('unable to logout...');
            } else {
                res.send('totsiens');
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;