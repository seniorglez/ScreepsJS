/**
 * This use case allows you to generate a creep from a room and a role.
 **/

var birthingPod = {
     /** 
      * Executes de use case.
      * @param {Room} room 
      * @param {String} role
      **/
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