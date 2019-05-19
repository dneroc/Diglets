let canvas = document.createElement("canvas");


canvas.width = 1280;
canvas.height = 720;

let c = canvas.getContext("2d");

let healthDecrease = -1;

let thicknessArray = [
    '#FFCDB2',
    '#FFB4A2',
    '#E5989B',
    '#B5838D',
    '#6D6875',
];

function distance(x1, y1, x2, y2) {

    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

}

digritos = new Digritos();

population = new Population(0.02, 100);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
        population.members = population.members.filter(diglet => diglet.health > 0);
        digritos.listof = digritos.listof.filter(array => array[0] != null);

    for (var i = 0; i < population.members.length; i++){
        population.members[i].update(population.members);
        population.members[i].draw(c);

    }
}


animate();
