var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepailer = require('role.repailer');
var roleClaimer = require('role.claimer');
var roleFighter = require('role.fighter');

const execute = (room) => {
    const creeps = room.find(FIND_MY_CREEPS);
    creeps.forEach(element => {
        console.log('Operating creep ' + element);
        switch (element.memory.role) {
            case 'harvester':
                roleHarvester(element);
                break;
            case 'upgrader':
                roleUpgrader(element);
                break;
            case 'builder':
                roleBuilder(element);
                break;
            case 'repailer':
                roleRepailer(element);
                break;
            case 'claimer':
                roleClaimer(element);
                break;
            case 'fighter':
                roleFighter(element);
                break;
            default:
                console.log('Creep without known role:', element)
        }
    });
}

module.exports = { execute };