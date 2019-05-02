class Diglet {
    constructor(x, y, dx, dy, radius) {
        
        this.genes = [];
        this.fitness = 0;
        this.genes[0] = Math.floor(Math.random() * thicknessArray.length);      //cell thickness
        this.genes[1] = Math.round(Math.random() * 100) / 100;                  //likelyness to cooperate
        this.growthRate = 1 - (this.genes[0] / thicknessArray.length);
        this.totalGrowth = 0;
        this.health = 200;


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



        
        for (let i = 0; i < digletArray.population.length; i++) {


            if (this === digletArray[i]) continue;
            
            if (distance(this.x, this.y, digletArray.population[i].x, digletArray.population[i].y) - this.radius * 2 < 0) {

                if(this.genes[1] > Math.round(Math.random() * 100) / 100) {


                }



                if (this.genes[0] > digletArray.population[i].genes[0]) {
                    this.totalGrowth += digletArray.population[i].totalGrowth;
                    this.health += digletArray.population[i].health;
                    digletArray.population.splice(i,1);
                }
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

        this.health += -0.00001 + this.growthRate;
        this.totalGrowth += this.growthRate;

        if(Math.random() < 0.0001){
            population.naturalSelection();
            let mate = floor(random(population.matingPool.length));
            let partner = population.matingPool[mate];
            let child = this.crossover(partner);
            child.mutate(population.mutationRate);
            population.population.push(child);
        }

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
                this.genes[0] = Math.floor(Math.random() * thicknessArray.length);
                this.growthRate = 1 - (this.genes[0] / thicknessArray.length);
                this.genes[1] = Math.round(Math.random() * 100) / 100;                  
            }
        }
    }

}

    




