/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utilities');
 * mod.thing == 'a thing'; // true
 */
function deleteDeadCreeps() {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

function goToHomeRoom(c) {
    // send creep back to room indicated in creep.memory.homeroom. Returns true if creep is in homeroom, false otherwise
    if (c.room.name != c.memory.homeroom) {
        let waypointFlag = Game.rooms[c.memory.homeroom].find(FIND_FLAGS);
        //console.log(this.room.name + ", " + this.name + ": " + waypointFlag.length);
        if (waypointFlag.length > 0) {
            //Waypoint flag found!
            gotoFlag(waypointFlag[0], c);
        } else {
            let controller = Game.rooms[c.memory.homeroom].controller;
            c.moveTo(controller, { reusePath: moveReusePath() });
        }
        return false;
    }  else { return true; }
};

function gotoFlag(flag, c) {
    if (flag.memory.waypoints == undefined) {
        // No waypoints set -> proceed directly to flag
        c.moveTo(flag);//, {reusePath: moveReusePath()}
    } else {
        // Target flag has waypoints set
        if (c.memory.waypointFlag != flag.name) {
            // New flag target -> reset counter;
            c.memory.waypointCounter = 0;
            c.memory.waypointFlag = flag.name;
        }

        if (flag.memory.waypoints.length == this.memory.waypointCounter) {
            // Last waypoint reached -> go to final destination
            if (c.pos.getRangeTo(flag) > 2) {
                c.moveTo(flag, { reusePath: moveReusePath() });
            } else {
                c.memory.sleep = 3;
            }
        } else {
            //Go to waypoint
            let waypointFlag = Game.flags[flag.memory.waypoints[c.memory.waypointCounter]];

            if (waypointFlag == null) {
                //Waypoint flag does not exist
                console.log("Flag " + flag.name + " in room " + flag.pos.roomName + " has an invalid way-point #" + c.memory.waypointCounter);
                return false;
            } else {
                //Waypoint is valid
                if (c.room.name == waypointFlag.pos.roomName) {
                    // Creep is in waypoint room
                    if (c.pos.getRangeTo(waypointFlag) < 2) {
                        // Waypoint reached
                        c.memory.waypointCounter++;
                    } else {
                        //c.moveTo(waypointFlag, {reusePath: moveReusePath()});
                        c.moveTo(waypointFlag);
                    }
                } else {
                    // Creep not in waypoint room
                    //c.moveTo(waypointFlag, {reusePath: moveReusePath()});
                    c.moveTo(waypointFlag);
                }
            }
        }
    }
};

function generateCreep(rol) {
    for (var s in Game.spawns) {//genera a un mierda en todos los spawns
        var spw = Game.spawns[s];

        spw.spawnCreep([WORK, CARRY, MOVE], 'Worker ' + Date.now(), {
            memory: {
                role: rol,
                homeroom: spw.room.name//funcion para sacar el nombre de la sala aqui
            }
        });
    }
}

module.exports = {
    deleteDeadCreeps,
    goToHomeRoom,
    gotoFlag,
    generateCreep
};