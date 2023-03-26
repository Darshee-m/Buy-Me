const {loginView, registerView } = require('../../controllers/loginController');
const express = require('express');
const router = express.Router();

router.get('/register', registerView);

router.get('/login', loginView);



router.post('/login', async (req, res) => {
    // TODO
});

router.post('/register', async (req, res) => {
    // TODO
    const queryParam = req.body;
});


module.exports = router;


