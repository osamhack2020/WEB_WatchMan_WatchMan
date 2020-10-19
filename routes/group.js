const express = require('express');
const router = express.Router();
const { User, Group } = require('../models');

router.get('/', (req, res) => {
    res.render('group', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
})

router.get('/code', (req, res) => {
    Group.count()
        .then(ele => {
            res.send(String(ele+1));
        });
});

router.get('/create', (req, res) => {
    res.render('group_create', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

router.get('/join', (req, res) => {
    res.render('group_join', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

router.get('/manage', (req, res) => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('98fbe85e58d84aa3afd2fb1b56ec4ccb');
    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.everything({
        q: 'disease',
        from: '2020-10-01',
        to: '2020-10-16',
        language: 'en',
        sortBy: 'relevancy',
        page: 2
    }).then(response => {
        res.send(response);
        /*
            {
            status: "ok",
            articles: [...]
            }
        */
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
    });
    
    res.render('group_manage', {
        user: req.user,
        loginError: req.flash('loginError'),
    });*/
});

router.post('/create', async (req, res, next) => {
    const { name, code, permit, set1, set1_day, set1_time, set2, set2_day, set2_time, set3, set3_day, set3_time } = req.body;
    const user = await User.findOne({ where: { id: req.user.id }});
    try{
        await Group.create({
            name,
            leader: req.user.id,
            permit,
            set1,
            set1_day,
            set1_time,
            set2,
            set2_day,
            set2_time,
            set3,
            set3_day,
            set3_time,
        });
        await user.addGroup(code);
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/search/:gn/:gc', async(req, res, next) => {
    try{
        if(req.params.gc == 0){
            const groups = await Group.findAll({//코드없이 그룹명으로만 찾는 경우
                where: { name: req.params.gn },
                attributes: ['id', 'name', 'permit', 'member'],
                include: [{
                    model: User,
                    where: { id: req.user.id },
                    attributes: ['name'],
                }],
            });
            res.json(groups);
        }else{
            const groups = await Group.findOne({ //코드까지 쳐서 검색하는 경우
                where: { name: req.params.gn, id: req.params.gc},
                attributes: ['id', 'name', 'permit', 'member'],
                include: [{
                    model: User,
                    where: { id: req.user.id },
                    attributes: ['name'],
                }],
            });
            res.json(groups);
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;