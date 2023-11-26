
var config = require('config');
var birthingPod = require('birthingPod');
const creepManager = require('creepManager');

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roomManager');
 * mod.thing == 'a thing'; // true
 */

let roles = ["builder", "harvester", "upgrader", "repailer", "fighter"];

const execute = (room) => {
   operateTower(room);
   controlCreepPopulation(room);
   creepManager.execute(room);
   defenseProtocol(room);
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

module.exports = { execute };