const router = require('express').Router();

const sequelize = require('../config/connection');
const{Post, User, Comment, Score} =require('../models');
const withAuth = require('../utils/auth')


router.get('/', withAuth, (req,res)=>{
    Promise.all([
        User.findOne({
            where:{
                id: req.session.user_id
            },
            attributes:['username', 'email', 'info']
            // include:[
            //     {
            //         model: Comment,
            //         attributes:['id',
            //                     'comment_text',
            //                     'created_at']
            //     },
            //     {
            //         model: Score,
            //         attributes:['Score'],
            //         limit:5,
            //         order:['created_at', 'DESC']
            //     }
            // ]
        }),

        Comment.findAll({
            where:{
                type: 'general'
            },
            attributes: ['comment_text', 'created_at'],
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order:[['created_at', 'DESC']]
        }),

        // Score.findAll({
        //     attributes:['Score'],
        //     limit: 10,
        //     order:['Score'],
        //     include:{
        //         model:User,
        //         attributes:['username']
        //     }
        // })
    ])
    .then(dbUserData =>{
        const user=dbUserData[0].get({plain:true});
        const comments =dbUserData[1].map(comment=>comment.get({plain:true}));
        // const Scores = dbUserData[2].map(Score=>Score.get({plain: true}));

        res.render('game-page', {
        user,
        comments,
        // Scores,
        loggedIn: req.session.loggedIn});
    });
    
});

router.get('/floppy', (req,res)=>{
    Promise.all([
        Comment.findAll({
            where:{
                type: 'floppy'
            },
            attributes: ['comment_text', 'created_at'],
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order:[['created_at', 'DESC']]
        })
    ])
    .then(dbGameData =>{
        const comments = dbGameData[0].map(comment=>comment.get({plain: true}));

        res.render('flappy-page', {
            comments,
            loggedIn: req.session.loggedIn
        });
    });
});

router.get('/snake', (req,res)=>{
    Promise.all([
        Comment.findAll({
            where:{
                type: 'snake'
            },
            attributes: ['comment_text', 'created_at'],
            include:[
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order:[['created_at', 'DESC']]
        })
    ])
    .then(dbGameData =>{
        const comments = dbGameData[0].map(comment=>comment.get({plain: true}));

        res.render('snake-page', {
            comments,
            loggedIn: req.session.loggedIn
        });
    });
});


module.exports=router;