const router = require('express').Router();
const sequelize = require('../config/connection');
const{Post, User, Comment, Time} =require('../models');

router.get('/', (req,res)=>{
    if(req.session.loggedIn){
        res.render('game-page', {
            loggedIn: req.session.loggedIn
        });
        return;
    }
    res.render('login');
})

module.exports=router;