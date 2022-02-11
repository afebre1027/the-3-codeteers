const PORT = process.env.PORT || 3001
const express = require('express')
const sequelize = require('./config/connection')
const path = require('path')
const app = express()
const session = require('express-session')
const routes = require('./Controllers')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess={
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
