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

router.post('/create', async (req, res, next) => {
    const { name, code } = req.body;
    const user = await User.findOne({ where: { id: req.user.id }});
    try{
        await Group.create({
            name,
            leader: req.user.id,
        });
        await user.addGroup(code);
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});


module.exports = router;