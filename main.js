var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepailer = require('role.repailer');
var roleClaimer = require('role.claimer');
var roleFighter = require('role.fighter');
var utilities = require('utilities');
var config = require('config');
var birthingPod = require('birthingPod');

let roles = ["builder", "harvester", "upgrader", "repailer", "fighter"];

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

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}

function controlCreepPopulation(targetRoom) {

    const numberOfConstructionSites = getNumberOfConstructionSites(targetRoom);

    var numberOfBuilders = _.sum(targetRoom.find(FIND_MY_CREEPS), (c) => c.memory.role == 'builder');
    var numberOfHarvesters = _.sum(targetRoom.find(FIND_MY_CREEPS), (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(targetRoom.find(FIND_MY_CREEPS), (c) => c.memory.role == 'upgrader');
    var numberOfRepailers = _.sum(targetRoom.find(FIND_MY_CREEPS), (c) => c.memory.role == 'repailer');
    var numberOfFighters = _.sum(targetRoom.find(FIND_MY_CREEPS), (c) => c.memory.role == 'fighter');

    if (config.population.minNumberOfBuilders > numberOfBuilders && numberOfConstructionSites > 0) birthingPod.run(targetRoom, roles[0]);
    if (config.population.minNumberOfHarvesters > numberOfHarvesters) birthingPod.run(targetRoom, roles[1]);
    if (config.population.minNumberOfUpgraders > numberOfUpgraders) birthingPod.run(targetRoom, roles[2]);
    if (config.population.minNumberOfRepailers > numberOfRepailers) birthingPod.run(targetRoom, roles[3]);
    if (config.population.minNumberOfFighters > numberOfFighters) birthingPod.run(targetRoom, roles[4]);
    
}

function getNumberOfConstructionSites(targetRoom) {
    const construction_sites = targetRoom.find(FIND_CONSTRUCTION_SITES);
    return construction_sites.length;
}

function defenseProtocol(targetRoom) {
    if(isStateOfWar(targetRoom)) {
        const roomCreeps = targetRoom.find(FIND_MY_CREEPS);
        for (let name of roomCreeps) {
            name.memory.role = "fighter";
        }
    }
}

function isStateOfWar(targetRoom) {
    const enemy_screeps = targetRoom.find(FIND_HOSTILE_CREEPS);
    return (enemy_screeps.length > 0)
}

function operateCreeps() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repailer':
                roleRepailer.run(creep);
                break;
            case 'claimer':
                roleClaimer.run(creep);
                break;
            case 'fighter':
                roleFighter.run(creep);
        }
    }
}

module.exports.loop = function () {

    utilities.deleteDeadCreeps();
    operateCreeps();

    for (var name in Game.rooms) {
        var currentRoom = Game.rooms[name];
        operateTower(currentRoom);
        controlCreepPopulation(currentRoom);
        defenseProtocol(currentRoom);
    }
}
