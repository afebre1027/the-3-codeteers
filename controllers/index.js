const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const loginRoutes = require('./login-routes');
const gamePageRoutes = require('./game-page');
const profilePageRoute = require('./profile-routes')

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/gamepage', gamePageRoutes);
router.use('/profile', profilePageRoute);

router.use((req,res)=>{
    res.status(404).end();
});


module.exports=router;