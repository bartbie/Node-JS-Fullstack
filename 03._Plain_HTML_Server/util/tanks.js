const { tanks } = require("./tanks.json");



function getTanks() {
    return tanks;
}

function addTank(tank) {
    tanks.push(tank);
    return tanks;
}

// console.log(module);

module.exports = {
    getTanks,
    addTank
};
