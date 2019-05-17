class Digritos {
	constructor() {
		this.listof = [];
	}


	findGroup(diglet){
		for(let digritoNo = 0; digritoNo < this.listof.length; digritoNo++) {
			if(this.listof[digritoNo].members.includes(diglet)) {
				return digritoNo;
			}
		}
		return false;
	}

	createNew(digrito) {
		this.listof.push(digrito);
	}

	addToDigrito(currentMember, newMember) {
		this.listof[this.findGroup(currentMember)].members.push(newMember);
	}

	getGrowthRate(dig) {
		return this.listof[this.findGroup(dig)].growthRate;
	}

	groupEat(dig,victim) {
		this.listof[this.findGroup(dig)].groupEats(victim);
	}

	refreshGrowthRate() {
		for(let i = 0; i < this.listof.length; i++) {
			this.listof[i].growthRateRefresh();
		}
	}

	isIn(dig) {
		for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[this.findGroup(dig)]) {return true;} else{return false;}
		}
	}

	bothIn(dig1, dig2) {
			for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(dig1) && this.listof[i].members.includes[dig2]) {return true;} else{return false;}
		}
	}

	groupBounce(diglet, coord) {
		this.listof[this.findGroup(diglet)].bounce(coord);
	}
}



class Digrito {
	constructor(members) {
		
		this.members = members;
		this.dx = members[0].dx;
		this.dy = members[0].dy;
		this.growthRate = 0;

		for(let i = 0; i < this.members.length;i++) {
			this.growthRate += this.members[i].growthRate;
		}

		this.growthRate = this.growthRate/this.members.length;

		for(let i = 0; i < this.members.length; i++) {
			this.members[i].dx = this.dx;
			this.members[i].dy = this.dy;
		}

	}

	groupEats(victim) {
		let nutrients = victim / this.members.length;
		for(let i = 0; i < this.members.length; i++) {
			this.members.health += nutrients;
			this.members.totalGrowth += nutrients;
		}
	}

	growthRateRefresh() {
		let gr = 0;
		for(let i = 0; i < this.members.length; i++) {
			this.members[i].dx = this.dx;
			this.members[i].dy = this.dy;
			gr += this.members[i].growthRate;
		}
		this.growthRate = gr;
	}

	bounce(coord) {

		if(coord === "x" ){
			for(let i = 0; i < this.members.length; i++) {
				this.members[i].dx = -this.members[i].dx;
				console.log("hi");

			}
		}
		if(coord === "y"){
			for(let i = 0; i < this.members.length; i++) {
				this.members[i].dy = -this.members[i].dy;
				console.log("bye");

			}
		}
	}
}