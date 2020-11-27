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
    minNumberOfHarvesters: 10,
    minNumberOfUpgraders: 4,
    minNumberOfRepailers: 2,
 };
 
 var lul = []

module.exports = {population, lul, };