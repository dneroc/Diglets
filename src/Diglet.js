//Diglets are the individuals in our simulation.
class Diglet {
    constructor(x, y, dx, dy, radius) {
        
        this.genes = [];
        this.fitness = 0;
        this.genes[0] = Math.floor(Math.random() * thicknessArray.length);      //cell thickness, a value between 0 and 4.
        this.genes[1] = (Math.round(Math.random() * 100) / 100);         //likeliness to cooperate, a value to between 0-1.
        this.growthRate = 1 - (((this.genes[0] + 1) / thicknessArray.length)).toFixed(1); //growth rate: 0 for thickest Diglets and 0.8 for the lightest ones.
        this.totalGrowth = 0;
        this.health = settings["health"];


        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = thicknessArray[this.genes[0]];

    }

    // just draws diglets""
    draw(c) {
        c.beginPath();
        c.arc(this.x,this.y , this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    //big method that moves diglets every frame. Takes in a digletArray(usually the population.members)/
    update(digletArray) {
        
        //repeat for every element in the given array.
        for (let i = 0; i < digletArray.length; i++) {

            // if the member of the population is the current diglet or part of the same Digrito then skip this loop.
            if (this === digletArray[i] || digritos.bothIn(this, digletArray[i]) === true) {
                continue;
            }
            
            // if two diglets touch
            if (distance(this.x, this.y, digletArray[i].x, digletArray[i].y) - this.radius * 2 <= 0) {

                //If both diglets cooperate.
                if(this.genes[1] > Math.round(Math.random() * 100) / 100) {
                    if(digletArray[i].genes[1] > Math.round(Math.random() * 100) / 100){

                        //if both diglets are in a digrito then continue.
                        if(digritos.findGroup(this) != -1 && digritos.findGroup(digletArray[i]) != -1) {
                            continue;
                        }
                        //if one diglet is in a digrito then add the new diglet to the digrito.
                        else if(digritos.findGroup(this) != -1){
                            digritos.addToDigrito(this, digletArray[i]);
                        }
                        else if(digritos.findGroup(digletArray[i]) != -1) {
                            digritos.addToDigrito(digletArray[i], this);
                        }

                        //if neither Diglets are in a Digrito and they cooperate then make one.
                        else {digritos.createNew(new Digrito([this, digletArray[i]]));}
                    }
                }

                //Group eat or eat a Diglet if it has a lighter cell thickness
                else if (this.genes[0] > digletArray[i].genes[0]) {
                    if(digritos.findGroup(this) != -1) {
                        digritos.groupEat(this, digletArray[i])
                        digletArray.splice(i,1);
                    }
                    else {
                        this.totalGrowth += digletArray[i].totalGrowth;
                        this.health += digletArray[i].health;
                        digletArray.splice(i,1);
                    }
                }
            }
        }
        
        // bounce diglets when they hit the top or bottom of the canvas,
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
                this.dx = - this.dx;
/*          
          groupBounce doesnt work yet
          if(digritos.findGroup(this) != -1) {
                digritos.groupBounce(this, "x");
            }
            else{this.dx = - this.dx;}*/
        }

        // bounce diglets when they hit the sides of the canvas.
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = - this.dy;
/*            if(digritos.findGroup(this) != -1) {
                digritos.groupBounce(this, "y");   
            }
            else{this.dy = - this.dy;}*/
        }

        // move diglets in given velocity.
        this.x += this.dx; 
        this.y += this.dy;

        // refresh growthRate for diglets.
        digritos.refreshGrowthRate();

        // if a diglet is in a digrito then increment it's total growth and health by the group growthRate value
        if(digritos.findGroup(this) != -1) {
            let gr = digritos.getGrowthRate(this);
            this.health +=  healthDecrease + gr;
            this.totalGrowth += gr;
        }

        // otherwise increase by it's own growth rate
        else{ 
            this.health += healthDecrease + this.growthRate;
            this.totalGrowth += this.growthRate;
        }

        if(settings["algorithm"] === "continuous") {
            if(Math.random(1) < 0.0005){
                population.naturalSelection();
                let mate = floor(random(population.matingPool.length));
                let partner = population.matingPool[mate];
                let child = this.crossover(partner);
                child.mutate(population.mutationRate);
                population.members.push(child);
            }
        }
    }

    //fitness is just the total growth of the Diglet
    fitness() {
        return this.totalGrowth;
    }

    // a crossover function
    crossover(partner) {
        
        //create a new diglet to be the child
        let child = new Diglet(this.x,this.y,this.dx,this.dy,this.radius);

        //create a random midpoint in the array
        let midpoint = floor(random(this.genes.length));
        
        for(let i = 0; i < this.genes.length; i++) {
            if (i === midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        child.color = thicknessArray[child.genes[0]];
       child.growthRate = 1 - (((child.genes[0] + 1) / thicknessArray.length)).toFixed(1);

        var x = Math.random() * (innerWidth - child.radius * 2) + child.radius;
        var y = Math.random() * (innerHeight - child.radius * 2) + child.radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);


        for (let j = 0; j < population.members.length; j++) {
            if(distance(x,y, population.members[j].x, population.members[j].y) - child.radius * 2 < 0) {
            
                x = Math.random() * (innerWidth - this.radius * 2) + child.radius;
                y = Math.random() * (innerHeight - this.radius * 2) + child.radius;

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
                this.growthRate = 1 - (((this.genes[0] + 1) / thicknessArray.length)).toFixed(1);
                this.genes[1] = Math.round(Math.random() * 100) / 100;                  
            }
        }
    }

}