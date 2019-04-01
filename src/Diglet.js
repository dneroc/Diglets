class Diglet {
    constructor(x, y, dx, dy, radius) {
        
        this.genes = [];
        this.fitness = 0;
        this.genes[0] = Math.floor(Math.random() * thicknessArray.length);
        this.growthRate = 1 - (this.genes[0] / thicknessArray.length);
        this.totalGrowth = 0;


        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = thicknessArray[this.genes[0]];

    }



    draw(c) {
        c.beginPath();
        c.arc(this.x,this.y , this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }




    update(digletArray) {

        for (let i = 0; i < digletArray.length; i++) {

            if (this === digletArray[i]) continue;
            /**
            if (distance(this.x, this.y, digletArray[i].x, digletArray[i].y) - this.radius * 2 < 0) {
                console.log('has collided');

            }
            **/

        }
        
        
        
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = - this.dx;
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = - this.dy;
        }

        this.x += this.dx; 
        this.y += this.dy;

        this.totalGrowth += this.growthRate;

    }


    fitness() {
        return this.totalGrowth;
    }


    crossover(partner) {
        
        let child = new Diglet(this.x,this.y,this.dx,this.dy,this.radius);

        let midpoint = floor(random(this.genes.length));

        for(let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        child.color = thicknessArray[child.genes[0]];

        var x = Math.random() * (innerWidth - child.radius * 2) + child.radius;
        var y = Math.random() * (innerHeight - child.radius * 2) + child.radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);

        

        for (let j = 0; j < population.length; j++) {
            if(distance(x,y, population[j].x, population[j].y) - child.radius * 2 < 0) {
            
                x = Math.random() * (innerWidth - radius * 2) + child.radius;
                y = Math.random() * (innerHeight - radius * 2) + child.radius;

                j = -1;

            }

        }

        
        child.x = x;
        child.y = y;
        child.dx = dx;
        child.dy = dy;
        return child;
    }



    mutate(mutationRate) {
        for(let i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate) {
                console.log("hi");
            }
        }
    }

}

    




