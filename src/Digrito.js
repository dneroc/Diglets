class Digritos {
	constructor() {
		this.listof = [];
		this.test = "hi";
	}

	createNew(digrito) {
		this.listof.push(digrito);
	}

	addToDigrito(currentMember, newMember) {
		for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(currentMember)) {
				this.listof[i].members.push(newMember);
			}
		}
	}

	getGrowthRate(dig) {
		for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(dig1)) {
				return this.listof[i].growthRate;
			}
		}
	}

	refreshGrowthRate() {
		for(let i = 0; i < this.listof.length; i++) {
			this.listof[i].growthRateRefresh();
		}
	}

	isIn(dig) {
		for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(dig1)) {return true;} else{return false;}
		}
	}

	isIn(dig1, dig2) {
		for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(dig1) && this.listof[i].members.includes[dig2]) {return true;} else{return false;}
		}
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

	growthRateRefresh() {
		let gr = 0;
		for(let i = 0; i < this.members.length; i++) {
			gr += this.members[i].growthRate;
		}
		this.growthRate = gr;
	}


}