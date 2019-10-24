var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepailer = require('role.repailer');
var utilities = require('utilities');

var numcreeps = 12;
let roles = ["builder", "harvester", "upgrader", "repailer"];




module.exports.loop = function () {

    utilities.deleteDeadCreeps();//esto limpia mierda, se supone

    //mirar como funcionan los pinga hash map

    if (numcreeps >= Object.keys(Game.creeps).length) {

        for (var s in Game.spawns) {//genera a un mierda en todos los spawns
            var spw = Game.spawns[s];



            spw.spawnCreep([WORK, CARRY, MOVE], 'Worker ' + Date.now(), {
                memory: {
                    role: roles[Math.floor((Math.random() * roles.length))],
                    homeroom: spw.room.name//funcion para sacar el nombre de la sala aqui
                }
            });



        }

        //var creep = Game.creeps[name];



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


    for (var name in Game.creeps) {//toma el array de creeps (for loop)
        var creep = Game.creeps[name];
        if (creep.room.name == creep.memory.homeroom) {
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'repailer') {
                roleRepailer.run(creep);//a veces se bloquean, repasar el código
            }
        }else{
            utilities.goToHomeRoom(creep); //no se como hacer esta pinche mierda culiada
        }

        
    }



    //para spawnear los screeps  Game.spawns.Spawn.createCreep([WORK,CARRY,MOVE,MOVE]);
    //para cambiarles el roll Game.creeps.Violet.memory.role = 'harvester';
}