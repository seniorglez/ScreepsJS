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
        
        let spawns = room.find(FIND_MY_SPAWNS); //This is a built in filter wtf
        let s = spawns[0];
        if (s) {
            console.log('Tying to build a new ' + rol + ' creep in ' + room)
            s.spawnCreep([WORK, CARRY, MOVE], 'Worker ' + Date.now(), {
            memory: {
                role: rol,
                homeroom: room.name
            }
        });
        }
    }
}


module.exports = birthingPod;