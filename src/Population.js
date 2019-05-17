

class Population {
    constructor(m, num) {

        this.generations = 0;
        this.mutationRate = m;
        


        this.population = [];



        for (let i = 0; i < num; i++) {
            let radius = 10;
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            let dx = (Math.random() - 0.5);
            let dy = (Math.random() - 0.5);

            if (i !== 0) {

                for (let j = 0; j < this.population.length; j++) {
                    if(distance(x,y, this.population[j].x, this.population[j].y) - radius * 2 < 0) {
                    
                        x = Math.random() * (innerWidth - radius * 2) + radius;
                        y = Math.random() * (innerHeight - radius * 2) + radius;

                        j = -1;

                    }
                }
            }

            this.population.push(new Diglet(x,y,dx,dy,radius))
        }

        this.matingPool = [];

    }

    naturalSelection() {

        this.matingPool = [];

        let maxFitness = 0;

        for(let i = 0; i < this.population.length; i++) {
            if(this.population[i].totalGrowth > maxFitness) {
                maxFitness = this.population[i].totalGrowth;
            }
        }

        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(floor(this.population[i].totalGrowth), 0, floor(maxFitness), 0, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }


    generate() {

        for ( let i = 0; i < 100; i++) {
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            //this.population[i] = partnerA.crossover(partnerB);
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;

        }
        this.generations++;
    }
}










