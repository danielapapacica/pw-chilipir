const Router = require('express')();

const AdsController = require('../Ads/controllers.js');
const UsersController = require('../Users/controllers.js');
const QuestionsController = require('../Questions/controllers.js');


Router.use('/ads', AdsController);
Router.use('/users', UsersController);
Router.use('/questions', QuestionsController);

module.exports = Router;