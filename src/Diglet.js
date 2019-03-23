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
        this.color = thicknessArray[Math.floor(Math.random() * thicknessArray.length)];

    }



    draw(c) {
        c.beginPath();
        c.arc(this.x,this.y , this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }




    update(digletArray, c) {

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

        this.draw(c);
    }


    crossover(partner) {
        
        let child = new Diglet();

        let midpoint = floor(random(this.genes.length));

        for(let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
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

    




