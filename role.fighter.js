/** 
 * This use case allows you make creeps work as fighter (Mele).
 **/

var roleFighter = {

    /**
     * Executes de use case.
     *  @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return;
            }
       
        const st = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (st) {
            if (creep.attack(st) == ERR_NOT_IN_RANGE) {
                creep.moveTo(st);
                return;
                }
            }
        
        }
    }
}
module.exports = roleFighter;