const router = require('express').Router();
const sequelize = require('../../config/connection');
const {User, Score} = require('../../models');

router.get('/', (req, res)=>{
    Score.findAll({
        limit: 10,
        attributes:['id', 'game_score', 'game'],
        order:[['game_score']],
        include:[{
            model: User,
            attributes:['username']
        }]
    })
    .then(dbScoreData => res.json(dbScoreData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res)=>{
    Score.findAll({
        limit: 10,
        attributes:['id', 'game_score', 'game'],
        order:[['game_score']],
        where:{
            user_id: req.params.id
        },
        include:[{
            model: User,
            attributes:['username']
        }]
    })
    .then(dbScoreData=>{
        if(!dbScoreData){
            res.status(404).json({message: 'No post found with that id.'});
            return;
        }
        res.json(dbScoreData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', (req, res)=>{
    Score.create({
        game_score: req.body.score,
        user_id: req.session.user_id,
        game: req.body.game
    })
    .then(dbScoreData => res.json(dbScoreData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports=router;