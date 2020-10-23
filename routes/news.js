const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('98fbe85e58d84aa3afd2fb1b56ec4ccb');
    var apiGroup = [];
    var a = await newsapi.v2.everything({
        q: '감염',
        from: '2020-10-10',
        to: '2020-10-21',
        language: 'ko',
        sortBy: 'relevancy'
    });
    apiGroup.push(a);
    a = await newsapi.v2.everything({
        q: 'trump',
        from: '2020-10-10',
        to: '2020-10-21',
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