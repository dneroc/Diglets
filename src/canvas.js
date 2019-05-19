let canvas = document.querySelector('canvas');


canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight -200;

let c = canvas.getContext('2d');
let refreshIntervalID;
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

function animate() {

    if(!restarted){
        requestAnimationFrame(animate);
    }
    if(!paused) {
        running = true;
        c.clearRect(0,0,innerWidth, innerHeight);
            population.members = population.members.filter(diglet => diglet.health > 0);
            digritos.listof = digritos.listof.filter(array => array[0] != null);

        for (var i = 0; i < population.members.length; i++){
            population.members[i].update(population.members);
            population.members[i].draw(c);

        }
    }
 
}

function run() {
    digritos = new Digritos();
    restarted = false;
    population = new Population(settings["mutationRate"], settings["populationSize"]);
    if(settings["algorithm"] === "generation") {
        refreshIntervalID = setInterval(function(){population.naturalSelection();population.generate()}, 10000);
    }
    pauseButton.disabled = false;
    runButton.disabled = true;
    animate();
}

