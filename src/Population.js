class Population {
    constructor(m, num) {

        this.generations = 0;
        this.mutationRate = m;
        this.num = num;

        this.members = [];



        for (let i = 0; i < num; i++) {
            let radius = 10;
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            let dx = (Math.random() - 0.5);
            let dy = (Math.random() - 0.5);

            if (i !== 0) {

                for (let j = 0; j < this.members.length; j++) {
                    if(distance(x,y, this.members[j].x, this.members[j].y) - radius * 2 < 0) {
                    
                        x = Math.random() * (innerWidth - radius * 2) + radius;
                        y = Math.random() * (innerHeight - radius * 2) + radius;

                        j = -1;

                    }
                }
            }

            this.members.push(new Diglet(x,y,dx,dy,radius))
        }

        this.matingPool = [];
    }


    naturalSelection() {

        this.matingPool = [];

        let maxFitness = 0;

        for(let i = 0; i < this.members.length; i++) {
            if(this.members[i].totalGrowth > maxFitness) {
                maxFitness = this.members[i].totalGrowth;
            }
        }

        //evaluate fitness and add to mating pool a proportionate amount of times for each member of the population
        for (let i = 0; i < this.members.length; i++) {
            let fitness = map(floor(this.members[i].totalGrowth), 0, floor(maxFitness), 0, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.members[i]);
            }
        }
    }


    generate() {

        for ( let i = 0; i < this.num; i++) {
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.members[i] = child;

        }
        this.generations++;
    }
}










