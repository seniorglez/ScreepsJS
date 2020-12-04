var roleBuilder = require('role.builder');
/** @param {Creep} creep **/

var roleRepailer = {
    run: function (creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.repairing == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.repairing = false;
        }
        // if creep is harvesting energy but is full
        else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.repairing = true;
            creep.say('⚡ repair');
        }

        // if creep is supposed to repair something
        if (creep.memory.repairing == true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                creep.say('now builder');
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};
module.exports = roleRepailer;