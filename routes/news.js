const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI(process.env.API_KEY);
    var apiGroup = [];
    var b = new Date();
    var c = new Date();
    c.setDate(c.getDate() - 7);
    var a = await newsapi.v2.everything({
        q: '감염',
        from: c,
        to: b,
        language: 'ko',
        sortBy: 'relevancy'
    });
    apiGroup.push(a);
    a = await newsapi.v2.everything({
        q: 'disease',
        from: c,
        to: b,
        language: 'en',
        sortBy: 'relevancy'
    });
    apiGroup.push(a);
    res.render('news', {
        user: req.user,
        loginError: req.flash('loginError'),
        article : apiGroup[0].articles,
        articl : apiGroup[1].articles,
    });
});


module.exports = router;