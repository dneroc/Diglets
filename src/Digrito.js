// Digritos class is a list of Digritos that I use to interact with Digritos. Useful when I'm not sure which Digrito a Diglet is in.
class Digritos {
	constructor() {
		this.listof = [];
	}

	//If the diglet supplied in the arguement belongs to a digrito return the index of the digrito, else return -1.
	findGroup(diglet){
		for(let digritoNo = 0; digritoNo < this.listof.length; digritoNo++) {
			if(this.listof[digritoNo].members.includes(diglet)) {
				return digritoNo;
			}
		}
		return -1;
	}

	//Add a new Digrito to our list.
	createNew(digrito) {
		this.listof.push(digrito);
	}

	//Add a new diglet to a Digrito and give it the velocity of the Digrito
	addToDigrito(currentMember, newMember) {
		let currentDigrito = this.findGroup(currentMember);
		this.listof[currentDigrito].members.push(newMember);
		newMember.dx = this.listof[currentDigrito].dx;
		newMember.dy = this.listof[currentDigrito].dy;
	}

	//Just Returns the growthRate of a digrito given a diglet.
	getGrowthRate(dig) {
		return this.listof[this.findGroup(dig)].growthRate;
	}

	//Given a Diglet, performs the group eat method for the Diglet it belongs to.
	groupEat(dig,victim) {
		this.listof[this.findGroup(dig)].groupEats(victim);
	}

	//refreshes the growth rate for all Digritos.
	refreshGrowthRate() {
		for(let i = 0; i < this.listof.length; i++) {
			this.listof[i].growthRateRefresh();
		}
	}

	//check if two Diglets are in the same array.
	bothIn(dig1, dig2) {
			for(let i = 0; i < this.listof.length; i++) {
			if(this.listof[i].members.includes(dig1) && this.listof[i].members.includes[dig2]) {return true;} else{return false;}
		}
	}

	//doesn't work; could be because the hit registers multiple times in a short period. needs some sort of cooldown.
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

		//tally growthRate between members and then divide it between the number of members.
		for(let i = 0; i < this.members.length;i++) {
			this.growthRate += this.members[i].growthRate;
		}
		this.growthRate = this.growthRate/this.members.length;

		//set members to travel in direction of the first member.
		for(let i = 0; i < this.members.length; i++) {
			this.members[i].dx = this.dx;
			this.members[i].dy = this.dy;
		}

	}

	//takes in a value of nutrients and splits it among members in the Digrito.
	groupEats(victim) {
		let nutrients = victim / this.members.length;
		for(let i = 0; i < this.members.length; i++) {
			this.members[i].health += nutrients;
			this.members[i].totalGrowth += nutrients;
		}
	}

	//run through the members of the Digrito and tally their growth rate, then divide it by the number of members in the Digrito(just like in the constructor).
	growthRateRefresh() {
		let gr = 0;
		for(let i = 0; i < this.members.length; i++) {
			gr += this.members[i].growthRate;
		}
		this.growthRate = gr/this.members.length;
	}


	bounce(coord) {

		//switch x velocity for all members in the digrito.
		if(coord === "x" ){
			for(let i = 0; i < this.members.length; i++) {
				this.members[i].dx = -this.members[i].dx;

			}
		}

		//switch y velocity for all members in the digrito.
		if(coord === "y"){
			for(let i = 0; i < this.members.length; i++) {
				this.members[i].dy = -this.members[i].dy;

			}
		}
	}
}