/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config');
 * mod.thing == 'a thing'; // true
 */

var population = {
   minNumberOfBuilders: 2,
   minNumberOfHarvesters: 2,
   minNumberOfUpgraders: 2,
   minNumberOfRepailers: 1,
   minNumberOfFighters: 1,
};

var lul = []

module.exports = { population, lul, };