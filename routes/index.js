const express = require('express');
const router = express.Router();


//메인 페이지
router.get('/', (req, res) => {
    res.render('index');
});

//회원가입 화면
router.get('/join', (req, res) => {
    res.render('join');
});

module.exports = router;