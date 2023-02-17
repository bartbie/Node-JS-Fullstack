const spaceships = [
    { name: "Chinese Weather Balloon", isPriceless: false, cost: 1_000_000 },
    { name: undefined, type: "UFO", isPriceless: true, cost: Number.MAX_SAFE_INTEGER },
    { name: "Apollo 13", versionNumber: 13, isPriceless: false, cost: 2_000_000 }
];

// spaceships.forEach((spaceship, index, array) => console.log(array));

const spaceshipsWithOwners = spaceships.map(spaceship => {
    return { ...spaceship, owner: "China" };
});

const pricelessSpaceships = spaceships.filter(spaceship => spaceship.isPriceless === true);
const notPricelessSpaceships = spaceships.filter(spaceship => spaceship.isPriceless === false);


const affordableSpaceship = spaceships.find(spaceship => spaceship.cost <= 2_000_000);


