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
    } else { return true; }
};

function gotoFlag(flag, creep) {
    if (flag.memory.waypoints == undefined) {
        // No waypoints set -> proceed directly to flag
        creep.moveTo(flag);//, {reusePath: moveReusePath()}
    } else {
        // Target flag has waypoints set
        if (creep.memory.waypointFlag != flag.name) {
            // New flag target -> reset counter;
            creep.memory.waypointCounter = 0;
            creep.memory.waypointFlag = flag.name;
        }

        if (flag.memory.waypoints.length == this.memory.waypointCounter) {
            // Last waypoint reached -> go to final destination
            if (creep.pos.getRangeTo(flag) > 2) {
                creep.moveTo(flag, { reusePath: moveReusePath() });
            } else {
                creep.memory.sleep = 3;
            }
        } else {
            //Go to waypoint
            let waypointFlag = Game.flags[flag.memory.waypoints[creep.memory.waypointCounter]];

            if (waypointFlag == null) {
                //Waypoint flag does not exist
                console.log("Flag " + flag.name + " in room " + flag.pos.roomName + " has an invalid way-point #" + creep.memory.waypointCounter);
                return false;
            } else {
                //Waypoint is valid
                if (creep.room.name == waypointFlag.pos.roomName) {
                    // Creep is in waypoint room
                    if (creep.pos.getRangeTo(waypointFlag) < 2) {
                        // Waypoint reached
                        creep.memory.waypointCounter++;
                    } else {
                        //c.moveTo(waypointFlag, {reusePath: moveReusePath()});
                        creep.moveTo(waypointFlag);
                    }
                } else {
                    // Creep not in waypoint room
                    //c.moveTo(waypointFlag, {reusePath: moveReusePath()});
                    creep.moveTo(waypointFlag);
                }
            }
        }
    }
};

module.exports = {
    deleteDeadCreeps,
    goToHomeRoom,
    gotoFlag
};