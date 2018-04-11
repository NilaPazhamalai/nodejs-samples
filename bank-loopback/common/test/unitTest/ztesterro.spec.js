var chai = require('chai');
var should = chai.should();

var app = require('../../../server/server');
var Transaction = app.models.Transaction;
var Account = app.models.Account; 