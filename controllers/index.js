const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const loginRoutes = require('./login-routes');
const gamePageRoutes = require('./game-page');

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/gamepage', gamePageRoutes);

router.use((req,res)=>{
    res.status(404).end();
});


module.exports=router;