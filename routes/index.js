const express = require('express');
const router = express.Router();


//메인 페이지
router.get('/', (req, res) => {
    res.render('index', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

//회원가입 화면
router.get('/join', (req, res) => {
    res.render('join', {
        joinError: req.flash('joinError'),
    });
});

module.exports = router;