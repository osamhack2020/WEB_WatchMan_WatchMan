const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('98fbe85e58d84aa3afd2fb1b56ec4ccb');
    newsapi.v2.everything({
        q: '감염',
        from: '2020-10-10',
        to: '2020-10-21',
        language: 'ko',
        sortBy: 'relevancy'
      },{
        q: 'trump',
        from: '2020-10-10',
        to: '2020-10-21',
        language: 'en',
        sortBy: 'relevancy'
      }).then(response => {
        res.send(response);
        /*
        res.render('news', {
            user: req.user,
            loginError: req.flash('loginError'),
            article: response.articles,
        });*/
      });
    /*
    var client_id = '3km6JC1yYh_bucjn9tjx';
    var client_secret = 'sKXTDPbesY';
    var api_url = 'https://openapi.naver.com/v1/search/news?query='+'%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim' encodeURI(req.query.query); // json 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });*/
});


module.exports = router;