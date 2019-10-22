var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var numcreeps=5;

module.exports.loop = function () {

        

    if(numcreeps >= Game.creeps.length || Game.creeps.length==undefined){//mantener screeps, mierda de codigo, porque Game.creeps.length es siempre undefined
            
               
                for(var s in Game.spawns) {//genera a un mierda en todos los spawns
                var spw = Game.spawns[s];
                var i;
                for (i = 0; i < 5; i++) {
                    spw.createCreep([WORK,CARRY,MOVE,MOVE]);
                } 
                
                }
                  for(var name in Game.creeps) {//asigna roles
                var creep = Game.creeps[name];
                var r = Math.floor(Math.random() * 3);

                switch(r) {//por lo menos es automatico
                         case 0:
                             creep.memory.role = 'harvester';
                            break;

                         case 1:
                             creep.memory.role = 'builder';
                            break;

                         case 2:
                             creep.memory.role = 'upgrader';
                            break;
                             }
                creep.memory.role="upgrader";
                }
            
        }else{
            console.log(Game.creeps.length);
        }
        
        
    var tower = Game.getObjectById('TOWER_ID');//tomo el objeto torre
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);//pillo a los mierdas
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    

    for(var name in Game.creeps) {//toma el array de creeps (for loop)
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    //para spawnear los screeps  Game.spawns.Spawn.createCreep([WORK,CARRY,MOVE,MOVE]);
    //para cambiarles el roll Game.creeps.Violet.memory.role = 'harvester';
}