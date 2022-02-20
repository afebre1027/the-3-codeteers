const PORT = process.env.PORT || 3001;
const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const routes = require('./controllers/');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: '*' }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  app.listen(PORT).on('clientError', (err, socket) => {
    console.log(err);
  });
});
