const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('productapp', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL'))
    .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;