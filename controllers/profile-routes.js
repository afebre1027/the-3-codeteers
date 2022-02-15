const router = require('express').Router();
const sequelize = require('../config/connection');
const{Post, User, Comment, Score} =require('../models');
const withAuth = require('../utils/auth');


router.get('/:username', withAuth, (req, res) =>{
    User.findOne({
        where:{
            username: req.params.username
        },
        attributes: ['id', 'username', 'email', 'info'],
        include:[
            {
                model: Comment,
                attributes:['comment_text', 'created_at', 'type'],
                include:{
                    model: User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(dbUserData =>{
        const user = dbUserData.get({plain:true});

        res.render('profile-page',{
            user,
            loggedIn : req.session.loggedIn,
            username: req.session.username
        })
    })
});

// router.get('/:username', (req, res)=>{
//     User.findOne({
//         where:{
//             username: req.params.username
//         },
//         attributes:['username', 'email', 'info'],
//         include:[
//             {
//                 model: Comment,
//                 attributes:['comment_text', 'created_at'],
//                 include:{
//                     model: User,
//                     attributes:['username']
//                 }
//             }
//         ]
//     })
//     .then(dbUserData =>{
//         const user = dbUserData.get({plain: true});

//         res.render('user-profile',{
//             user,
//             loggedIn : req.session.loggedIn,
//         })
//     });
// });

module.exports = router;