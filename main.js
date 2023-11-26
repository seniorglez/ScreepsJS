var utilities = require('utilities');
var RoomManager = require('roomManager');

module.exports.loop = function () {
    utilities.deleteDeadCreeps();
    for (var name in Game.rooms) {
        var currentRoom = Game.rooms[name];
        RoomManager.execute(currentRoom);
    }
}

