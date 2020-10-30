const express = require('express');
const router = express.Router();
const { User, Group, Permit } = require('../models');
const { Op } = require('sequelize');


/* 그룹 생성/참여 눌렀을때*/
router.get('/', (req, res) => {
    res.render('group', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
})

/* 그룹 참여 코드 발급 */ 
router.get('/code', (req, res) => {
    Group.count()
        .then(ele => {
            res.send(String(ele+1));
        });
});
/* 그룹 생성 페이지로 감 */
router.get('/create', (req, res) => {
    res.render('group_create', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});
/* 그룹 참가 페이지로 감 */
router.get('/join', (req, res) => {
    res.render('group_join', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

/* 참가중인 그룹 들어갔을때 나오는 페이지 */
router.get('/join/info/:grcode', (req, res, next) => {
    res.render('group_info', {
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

/* 자기가 그룹장인 그룹 클릭했을 때*/
router.get('/join/admin/:grcode', (req, res) => {
    res.render('group_admin', {
        grcode: req.params.grcode,
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

/* 그룹 승인 허가 */
router.post('/join/permit/:grcode', async (req, res, next) => {
    try{
        const { sub, permit_list } = req.body;
        for(var i=0; i<permit_list.length; i++){
            await Permit.destroy({ where: { usid: permit_list[i], grid: req.params.grcode }});
        }
        res.send('ok');
    }catch(error){
        console.error(error);
        next(error);
    }
});

/* 그룹장인 그룹 설정 하는 페이지 */
router.get('/admin/setting/:grcode', async (req, res, next) => {
    try{
        const group = await Group.findOne({
            where: { id: req.params.grcode },
        });
        res.render('group_setting', {
            user: req.user,
            loginError: req.flash('loginError'),
            group,
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});

/* 그룹장인 그룹 멤버 관리 페이지 */
router.get('/admin/member/:grcode', async (req, res, next) => {
    try{
        const group = await Group.findOne({
            where: { id: req.params.grcode },
            include: [{
                model: User,
                where:{
                    id: {
                        [Op.not]: req.user.id
                    }
                }
            }]
        });
        const permituserid = await Permit.findAll({
            where: { grid: req.params.grcode },
            attributes: ['usid']
        });
        let permitusers = [];
        for( var i in permituserid){
            let = temper = await User.findOne({
                where: {id: permituserid[i].usid}
            });
            permitusers.push(temper);
        }
        res.render('group_member', {
            user: req.user,
            loginError: req.flash('loginError'),
            group,
            permitusers,
            grcode: req.params.grcode,
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});


/* 그룹 참가 데이터 DB 넘기기 */
router.get('/join/permit/:groupid/:leader/:permit/:num', async(req, res, next) => {
    try{
        if(req.params.leader == req.user.name){/* 그룹장이 자기 그룹 참가하려하는경우 */
            res.send('이미 가입되어 있습니다');
        }else{
            if(req.params.permit == "true"){/* 승인이 필요한 경우*/
                let bee = await Permit.findOne({
                    where: { grid: req.params.groupid, usid: req.user.id },
                });
                if(bee != null){
                    res.send('승인중입니다');
                }else{
                    const bery = await Permit.create({
                        grid: req.params.groupid,
                        usid: req.user.id,
                    });
                    const very = await Group.findOne({
                        where: { id: req.params.groupid },
                    });
                    await very.addPermit(bery);
                    res.send('ok');
                }
            }else{
                const user = await User.findOne({
                    where: { id: req.user.id },
                });
                let belong = await user.getGroups({
                    where: { id: req.params.groupid },
                });
                if(belong.length != 0){/* 이미 속한 인원이 다시 참가하려는 경우 */
                    res.send('이미 가입되어 있습니다');
                }else{
                    await user.addGroups(req.params.groupid);
                    await Group.update(
                        { member: parseInt(req.params.num) +1 },
                        { where: { id: req.params.groupid },
                    })
                    res.send('ok');
                }
            }
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});
/* 내 그룹 관리 눌렀을 때 */
router.get('/manage', async (req, res, next) => {
    try{
        const user = await User.findOne({ where: {id: req.user.id }});
        let abc = [];
        let doolli = await user.getGroups();
        let dounu = await Permit.findAll({ 
            where: {usid: req.user.id }, 
            include: [{
                model: Group,
            }] 
        });
        abc.push(doolli);
        abc.push(dounu);
        res.render('group_manage', {
            grouping: abc[0],
            groupwait: abc[1],
            user: req.user,
            loginError: req.flash('loginError'),
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});
/* 그룹 생성하고 DB로 데이터 넘김*/
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
        await user.addGroups(code);
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});
/* 그룹 검색 하는 부분 */
router.get('/search/:gn/:gc', async(req, res, next) => {
    try{
        if(req.params.gc == 0){
            const groups = await Group.findAll({//코드없이 그룹명으로만 찾는 경우
                where: { name: req.params.gn },
                attributes: ['id', 'name', 'permit', 'member'],
                include: [{
                    model: User,
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