const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment, Time } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req,res)=>{
//     if(req.session.loggedIn){
//         res.render('game-page', {
//             username: req.session.username,
//             email:req.session.email,
//             loggedIn: req.session.loggedIn
//         });
//         console.log('made it this far');
//         return;
//     }
//     res.render('login');
// })

router.get('/', withAuth, (req, res) => {
  Promise.all([
    User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ['username', 'email'],
      // include:[
      //     {
      //         model: Comment,
      //         attributes:['id',
      //                     'comment_text',
      //                     'created_at']
      //     },
      //     {
      //         model: Time,
      //         attributes:['time'],
      //         limit:5,
      //         order:['created_at', 'DESC']
      //     }
      // ]
    }),

    Comment.findAll({
      attributes: ['comment_text', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['created_at', 'DESC']],
    }),

    Time.findAll({
      attributes: ['time'],
      limit: 10,
      order: ['time'],
      include: {
        model: User,
        attributes: ['username'],
      },
    }),
  ]).then((dbUserData) => {
    const user = dbUserData[0].get({ plain: true });
    const comments = dbUserData[1].map((comment) =>
      comment.get({ plain: true })
    );
    const times = dbUserData[2].map((time) => time.get({ plain: true }));

    res.render('game-page', {
      user,
      comments,
      times,
      loggedIn: req.session.loggedIn,
    });
  });
});

// router.get('/', withAuth, (req,res)=>{

//     .then(dbCommentData =>{
//         const comments = dbCommentData.map(comment=>comment.get({plain:true}));
//         res.render('game-page', {
//             comments,
//             loggedIn: req.session.loggedIn
//         });
//     });
// });

module.exports = router;
