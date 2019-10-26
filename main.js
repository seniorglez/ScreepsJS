var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepailer = require('role.repailer');
var roleClaimer = require('role.claimer');
var utilities = require('utilities');

var numcreeps = 20;
let roles = ["builder", "harvester", "upgrader", "repailer"];




module.exports.loop = function () {

    utilities.deleteDeadCreeps();//this deletes the dead creeps that remains in the memory

    if (numcreeps >= Object.keys(Game.creeps).length) {//this generates a creep in every spawn
        utilities.generateCreep(roles[Math.floor((Math.random() * roles.length))]);
        
    }


    var tower = Game.getObjectById('1ff27ccb771c1fd');//tomo el objeto torre
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);//pillo a los mierdas
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            if (utilities.goToHomeRoom(creep)) {
                roleHarvester.run(creep);
            }

        }
        if (creep.memory.role == 'upgrader') {
            if (utilities.goToHomeRoom(creep)) {
                roleUpgrader.run(creep);
            }

        }
        if (creep.memory.role == 'builder') {
            if (utilities.goToHomeRoom(creep)) {
                roleBuilder.run(creep);
            }
        }
        if (creep.memory.role == 'repailer') {
            if (utilities.goToHomeRoom(creep)) {
                roleRepailer.run(creep);
            }
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }


    }

}
