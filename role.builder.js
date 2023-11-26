var roleHarvester = require('role.harvester');

/** 
 * This use case allows you make creeps work as builders.
 **/
var roleBuilder = {

    /**
     * Executes de use case.
     *  @param {Creep} creep 
     **/
    run: function (creep) {

        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        // if creep is harvesting energy but is full
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                //turn into a harvester here
                creep.say('now Harvester');
                roleHarvester.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;