/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('birthingPod');
 * mod.thing == 'a thing'; // true
 */

var birthingPod = {

    run: function (room, rol) {

        const spawns = room.find(FIND_MY_SPAWNS);
        const spw = spawns[0];

        spw.spawnCreep([WORK, CARRY, MOVE], 'Worker ' + Date.now(), {
            memory: {
                role: rol,
                homeroom: room.name
            }
        });
    }
}


module.exports = birthingPod;