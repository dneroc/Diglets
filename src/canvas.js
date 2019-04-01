var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var thicknessArray = [
    '#010E26',
    '#001A47',
    '#183466',
    '#2B4C84',
    '#387EF5',
];


function distance(x1, y1, x2, y2) {

    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

}
/**
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = thicknessArray[Math.floor(Math.random() * thicknessArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y , this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(circleArray) {

        for (let i = 0; i < circleArray.length; i++) {

            if (this === circleArray[i]) continue;
            
            if (distance(this.x, this.y, circleArray[i].x, circleArray[i].y) - this.radius * 2 < 0) {
                console.log('has collided');

            }

        }
        
        
        
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = - this.dx;
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = - this.dy;
        }

        this.x += this.dx; 
        this.y += this.dy;

        draw();
    }

}

**/

var circleArray = [];
/**
var dx = (Math.random() < 0.5 ? -1 : 1);
var dy = (Math.random() < 0.5 ? -1 : 1);
**/
/**
for (var i = 0; i < 20; i++) {
    var radius = 10;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);

    if (i != 0) {

        for (let j = 0; j < circleArray.length; j++) {
            if(distance(x,y, circleArray[j].x, circleArray[j].y) - radius * 2 < 0) {
            
                x = Math.random() * (innerWidth - radius * 2) + radius;
                y = Math.random() * (innerHeight - radius * 2) + radius;

                j = -1;

            }

        }


    }

    circleArray.push(new Diglet(x,y,dx,dy,radius))
}

**/

population = new Population(0, 100);



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    
    for (var i = 0; i < population.population.length; i++){
        population.population[i].update(population);
        population.population[i].draw(c);

    }


}


let hsia = new Diglet();
console.log(population);
animate();



//setTimeout(function(){population.naturalSelection();population.generate()}, 3000);
