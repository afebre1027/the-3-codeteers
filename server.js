const PORT = process.env.PORT || 3001
const express = require('express')
const sequelize = require('./config/connection')
const path = require('path')
const app = express()
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
