var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepailer = require('role.repailer');
var roleClaimer = require('role.claimer');
var utilities = require('utilities');
var config = require('config');

let roles = ["builder", "harvester", "upgrader", "repailer"];

function operateTower(targetRoom) {
    var towers = targetRoom.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    })

    for (let tower of towers) {
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
    }
}

module.exports.loop = function () {
    //control de creeps number
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfRepailers = _.sum(Game.creeps, (c) => c.memory.role == 'repailer');

    utilities.deleteDeadCreeps();//this deletes the dead creeps that remains in the memory

    if (config.population.minNumberOfBuilders > numberOfBuilders) {
        utilities.generateCreep(roles[0]);
    }
    if (config.population.minNumberOfHarvesters > numberOfHarvesters) {
        utilities.generateCreep(roles[1]);
    }
    if (config.population.minNumberOfUpgraders > numberOfUpgraders) {
        utilities.generateCreep(roles[2]);
    }
    if (config.population.minNumberOfRepailers > numberOfRepailers) {
        utilities.generateCreep(roles[3]);
    }

    for (var name in Game.rooms) {
        var currentRoom = Game.rooms[name];
        operateTower(currentRoom);
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
