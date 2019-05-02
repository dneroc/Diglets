var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var thicknessArray = [
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

var circleArray = [];


population = new Population(0.2, 100);



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    
    for (var i = 0; i < population.population.length; i++){
        population.population[i].update(population);
        population.population[i].draw(c);
        
    }


}

animate();



setInterval(function(){population.naturalSelection();population.generate()}, 3000);
