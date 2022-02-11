const router = require('express').Router();
const sequelize = require('../../config/connection');
const {User, Time} = require('../../models');

router.get('/', (req, res)=>{
    Time.findAll({
        limit: 10,
        attributes:['id', 'time'],
        order:[['time']],
        include:[{
            model: User,
            attributes:['username']
        }]
    })
    .then(dbTimeData => res.json(dbTimeData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res)=>{
    Time.findAll({
        limit: 10,
        attributes:['id', 'time'],
        order:[['time']],
        where:{
            user_id: req.params.id
        },
        include:[{
            model: User,
            attributes:['username']
        }]
    })
    .then(dbTimeData=>{
        if(!dbTimeData){
            res.status(404).json({message: 'No post found with that id.'});
            return;
        }
        res.json(dbTimeData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', (req, res)=>{
    Time.create({
        time: req.body.time,
        user_id: req.session.user_id
    })
    .then(dbTimeData => res.json(dbTimeData))
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports=router;